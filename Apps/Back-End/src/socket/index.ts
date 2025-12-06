import { Server } from "socket.io";

export function registerSockets(io: Server) {
  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);

    // exemplo básico
    socket.on("joinRoom", (room) => {
      socket.join(room);
    });
  });
}
