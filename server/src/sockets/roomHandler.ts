// Handles the connection of users to a room.
//
import { Server } from "socket.io";
import { Error, Player, Room, ISocket } from "../interfaces";

const rooms: Record<string, Room> = {};
const alphabet: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const roomCodeLength: number = 4;

/*
 * Creates a Player object given socketId and name
 *
 */
export const initPlayer = (socketId: string, name: string): Player => {
  let player: Player = {
    socketId: socketId,
    name: name,
    hand: [],
    storage: [],
    points: 0,
    goals: [],
  };
  return player;
};

export const addPlayer = (p: Player, roomId: string): void | Error => {
  console.log(roomId);
  if (rooms[roomId] == undefined) {
    return { errMsg: `Room ${roomId} does not exist` };
  }
  let room: Room = rooms[roomId];
  for (let existingPlayer of room.players) {
    if (existingPlayer.socketId == p.socketId) {
      return { errMsg: `Player has already joined the room` };
    }
  }
  room.players.push(p);
  updateRoom(room);
};

// Creates a room and returns the code/id for that room
export const generateRoom = (socket: ISocket): string => {
  let code: string = "";
  for (let i = 0; i < roomCodeLength; i++) {
    code += alphabet[Math.floor(Math.random() * 26)];
  }
  while (code in rooms) {
    code = "";
    for (let i = 0; i < roomCodeLength; i++) {
      code = alphabet[Math.floor(Math.random() * 26)];
    }
  }
  let player: Player = initPlayer(socket.id, socket.username);
  let room: Room = {
    id: code,
    players: [player],
    turn: 0,
    start: false,
  };
  rooms[code] = room;
  return code;
};

export const getRoom = (roomId: string): Room => {
  return rooms[roomId];
};

export const updateRoom = (newRoom: Room): void => {
  rooms[newRoom.id] = newRoom;
};

export const removePlayer = (socket: ISocket): void => {
  for (let roomId of Object.keys(rooms)) {
    if (!rooms.start) {
      let index = -1;
      for (let player of rooms[roomId].players) {
        index++;
        if (player.socketId == socket.id) {
          break;
        }
      }
      if (index >= 0) {
        console.log("removing player from " + roomId);
        rooms[roomId].players.splice(index, 1);
        socket.to(roomId).emit("c:room:getPlayers", JSON.stringify(rooms[roomId].players));
        socket.leave(roomId);
      }
    }
  }
};

// const getPlayerNames = (roomId: string): string[] => {
//   let names: string[] = [];
//   for (let player of rooms[roomId].players) {
//     names.push(player.name);
//   }
//   return names;
// };

const isPlayerInRoom = (socketId: string, roomId: string): Boolean => {
  console.log(roomId);
  for (let player of rooms[roomId].players) {
    if (player.socketId == socketId) {
      return true;
    }
  }
  return false;
};

// Setup sockets
export const registerRoomHandlers = (io: Server, socket: ISocket) => {
  const createRoom = (): void => {
    let roomCode: string = generateRoom(socket);
    io = io;
    socket.join(roomCode);
    console.log(`created the room ${roomCode}`);
    socket.emit("c:room:create", `${roomCode}`);
  };

  const joinRoom = (roomId: string): void => {
    let player: Player = initPlayer(socket.id, socket.username);
    let addRes: void | Error = addPlayer(player, roomId);
    if (addRes != undefined) {
      console.log(addRes.errMsg);
      socket.emit("c:room:error", JSON.stringify({ error: addRes.errMsg }));
      return;
    }
    socket.to(roomId).emit("c:room:getPlayers", JSON.stringify(rooms[roomId].players));
    socket.emit("c:room:join", `${roomId}`);
    socket.join(roomId);
    console.log(`${socket.username} joined the room ${roomId}`);
  };

  const getPlayers = (roomId: string): void => {
    if (!(roomId in rooms)) {
      console.log("given roomId does not exist");
      socket.emit("c:room:error", "getPlayers: given roomId does not exist");
      return;
    }
    if (!isPlayerInRoom(socket.id, roomId)) {
      socket.emit("c:room:error", "getPlayers: player has not joined the room");
      return;
    }
    socket.emit("c:room:getPlayers", JSON.stringify(rooms[roomId].players));
  };

  socket.on("room:create", createRoom);
  socket.on("room:join", joinRoom);
  socket.on("room:getPlayers", getPlayers);
  // Create a disconnect handler?
  // Handle reconnection? See https://socket.io/docs/v4/connection-state-recovery
};
