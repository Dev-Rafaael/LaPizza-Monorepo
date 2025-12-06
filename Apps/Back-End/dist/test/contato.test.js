"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
describe("Test Contact", () => {
    let mockId;
    it("should show a new Contact", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).get("/contatos/");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("email");
        mockId = res.body[0].id;
    }));
    it("should create a new Contact", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).post("contatos/criar").send({
            nome: "Rafael",
            sobreNome: "Moraes",
            email: "rafael@test.com",
            assunto: "duvida",
            mensagem: "abre hoje ?",
        });
        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({
            nome: "Rafael",
            sobreNome: "Moraes",
            email: "rafael@test.com",
            assunto: "duvida",
            mensagem: "abre hoje ?",
        });
    }));
    it("should update a new Contact", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).put(`contatos/${mockId}`).send({
            nome: "Rafael",
            sobreNome: "Moraes",
            email: "rafael@test.com",
            assunto: "duvida",
            mensagem: "abre hoje ?",
        });
        expect(res.status).toBe(200);
        expect(res.body).toContain("nome");
    }));
    it("should delete a new Contact", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).delete(`contatos/${mockId}`).send({
            nome: "Rafael",
            sobreNome: "Moraes",
            email: "rafael@test.com",
            assunto: "duvida",
            mensagem: "abre hoje ?",
        });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "Contato deletado com sucesso");
    }));
});
