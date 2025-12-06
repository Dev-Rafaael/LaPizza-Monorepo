import express from "express";
import cors from "cors";
import rotas from "./routes/rotas";
import { stripeWebhook } from "./controllers/stripeWebhook";
import http from "http";
import { Server } from "socket.io";
import { registerSockets } from "./socket";
const server = express();
const port = process.env.PORT || 3333
server.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);
server.use(express.json());
server.use(cors());
server.use(rotas)

const httpServer = http.createServer(server);

export const io = new Server(httpServer, {
  cors: { origin: "*" },
});
registerSockets(io);

httpServer.listen(port, () => {
  console.log(`Server Rodando Na Porta ${port} 🚀`);
});


export default server;