import { Server } from "socket.io";
import { ISocket } from "./interfaces";
import { registerRoomHandlers, removePlayer } from "./sockets/roomHandler";

const io = new Server(3000, {
  cors: {
    origin: "*", // Change later when deploying
  },
});

io.use((socket: ISocket, next) => {
  const username: string = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("no username"));
  }
  socket.username = username;
  next();
});

console.log("starting");

const onConnection = (socket: ISocket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    removePlayer(socket);
    console.log("user disconnected");
  });
  registerRoomHandlers(io, socket);
};

io.on("connection", onConnection);
