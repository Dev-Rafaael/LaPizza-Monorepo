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
exports.deleteUserService = exports.updateUserService = exports.loginService = exports.createUserService = exports.getUniqueUserService = exports.getUserService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const SALT_ROUNDS = 10;
const JWT_SELECT = process.env.JWT_SECRET || "secret";
const getUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataUser = yield prisma.user.findMany();
        return dataUser;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUserService = getUserService;
const getUniqueUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (id) {
            const dataUniqueUser = yield prisma.user.findUnique({
                where: { id },
            });
            return dataUniqueUser;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUniqueUserService = getUniqueUserService;
const createUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailExist = yield prisma.user.findUnique({
            where: { email: data.email },
        });
        if (emailExist) {
            throw new Error("Email já cadastrado.");
        }
        console.log("Senha recebida:", data.senha);
        const hashedPassword = yield bcrypt_1.default.hash(data.senha, SALT_ROUNDS);
        console.log("Senha com hash:", hashedPassword);
        const newUser = yield prisma.user.create({
            data: {
                nome: data.nome,
                sobreNome: data.sobreNome,
                email: data.email,
                cpf: data.cpf,
                nascimento: data.nascimento,
                telefone: data.telefone,
                sexo: data.sexo,
                senha: hashedPassword,
            },
            select: { id: true, nome: true, email: true, criadoEm: true }
        });
        return newUser;
    }
    catch (error) {
        console.log(error);
    }
});
exports.createUserService = createUserService;
const loginService = (email, senha) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userExist = yield prisma.user.findUnique({ where: { email } });
        if (!userExist)
            throw new Error("Usuário não encontrado");
        const isValid = yield bcrypt_1.default.compare(senha, userExist.senha);
        if (!isValid)
            throw new Error("Senha Invalida");
        const token = jsonwebtoken_1.default.sign({ id: userExist.id, email: userExist.email }, JWT_SELECT, { expiresIn: "30min" });
        return { user: userExist, token };
    }
    catch (error) {
        console.log(error);
    }
});
exports.loginService = loginService;
const updateUserService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (id && data) {
            const updatedUser = yield prisma.user.update({
                where: { id },
                data,
            });
            return updatedUser;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateUserService = updateUserService;
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (id) {
            yield prisma.user.delete({
                where: { id },
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteUserService = deleteUserService;
