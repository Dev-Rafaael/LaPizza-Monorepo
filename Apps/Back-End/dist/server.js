"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const rotas_1 = __importDefault(require("./routes/rotas"));
const server = (0, express_1.default)();
const port = process.env.PORT || 3333;
server.use(express_1.default.json());
server.use((0, cors_1.default)());
server.use(rotas_1.default);
server.listen(port, () => console.log(`Server Rodando Na Porta ${port}🚀`));
exports.default = server;
