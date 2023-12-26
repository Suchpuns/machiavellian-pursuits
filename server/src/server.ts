import { Server } from "socket.io";
import { ISocket } from "./interfaces";
import { registerRoomHandlers } from "./sockets/roomHandler";

const io = new Server(3000, {
  cors: {
    origin: "*",
  },
});

console.log("starting");

const onConnection = (socket: ISocket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  registerRoomHandlers(io, socket);
};

io.on("connection", onConnection);
