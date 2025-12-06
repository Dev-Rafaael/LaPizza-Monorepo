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
describe("Account Api", () => {
    let mockId;
    it("should show an Account", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).get("/account").send({
            nome: "Rafael",
            sobreNome: "Moraes",
            email: "rafael@test.com",
            cpf: "12345678900",
            nascimento: "2000-01-01",
            telefone: "11910928922",
            sexo: "masculino",
            senha: "123456",
        });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("nome");
        mockId = res.body.id;
    }));
    it("should create a new Account", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).post("/account").send({
            nome: "Rafael",
            sobreNome: "Moraes",
            email: "rafael@test.com",
            cpf: "12345678900",
            nascimento: "2000-01-01",
            telefone: "11910928922",
            sexo: "masculino",
            senha: "123456",
        });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("id");
    }));
    it("should update an Account", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).put(`/account/${mockId}`).send({
            nome: "Rafael",
            sobreNome: "Moraes",
            email: "rafael@test.com",
            cpf: "12345678900",
            nascimento: "2000-01-01",
            telefone: "11910928922",
            sexo: "masculino",
            senha: "123456",
        });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("nome");
    }));
    it("should delete an Account", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).delete(`/account/${mockId}`).send({
            nome: "Rafael",
            sobreNome: "Moraes",
            email: "rafael@test.com",
            cpf: "12345678900",
            nascimento: "2000-01-01",
            telefone: "11910928922",
            sexo: "masculino",
            senha: "123456",
        });
        expect(res.status).toBe(200);
        expect(res.body).not.toContain("nome");
    }));
});
