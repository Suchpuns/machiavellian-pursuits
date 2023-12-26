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

// Setup sockets
export const registerRoomHandlers = (io: Server, socket: ISocket) => {
  const createRoom = (): void => {
    let roomCode: string = generateRoom(socket);
    io = io;
    socket.emit("rooms", `created the room ${roomCode}`);
  };

  const joinRoom = (roomId: string): void => {
    let player: Player = initPlayer(socket.id, socket.username);
    let addRes: void | Error = addPlayer(player, roomId);
    if (addRes != undefined) {
      console.log(addRes.errMsg);
      return;
    }
    socket.emit("rooms", `joined the room ${roomId}`);
  };

  socket.on("room:create", createRoom);
  socket.on("room:join", joinRoom);
  // Create a disconnect handler?
  // Handle reconnection? See https://socket.io/docs/v4/connection-state-recovery
};
