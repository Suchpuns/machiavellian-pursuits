// Handles the connection of users to a room.
//
import { Server } from "socket.io";
import { Player, Room, ISocket } from "../interfaces";

const rooms: Record<string, Room> = {};
const alphabet: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const initPlayer = (socketId: string, name: string): Player => {
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

const generateRoom = (socket: ISocket): Room => {
  let code: string = "";
  while (code in rooms) {
    for (let i = 0; i < 4; i++) {
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
  return room;
};

export const registerRoomHandlers = (io: Server, socket: ISocket) => {
  let room = generateRoom(socket);
  io = io;
  socket.emit("rooms", `created the room ${room.id}`);
};
