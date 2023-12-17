import { Server, Socket } from "socket.io";
import { Player, Room, ISocket, Disconnect } from "../interfaces";

const rooms: Record<string, Room> = {};
const alphabet: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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

export const generateRoom = (socket: ISocket): void => {
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
  rooms[code] = room;
};
