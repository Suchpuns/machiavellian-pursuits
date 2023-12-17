import { Socket } from "socket.io";

export interface ISocket extends Socket {
  userId?: string;
  roomName?: string;
}

export interface Disconnect {
  userId: string;
  timeOutObj: NodeJS.Timeout;
}
