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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDelete = exports.userUpdate = exports.userLogin = exports.userCreate = exports.userShowUnique = exports.userShow = void 0;
const userService_1 = require("../services/userService");
const userShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userService_1.getUserService)();
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ error: "Usuario Não encontrado" });
    }
});
exports.userShow = userShow;
const userShowUnique = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (id) {
            const userUnique = yield (0, userService_1.getUniqueUserService)(id);
            res.status(200).json(userUnique);
        }
    }
    catch (error) {
        res.status(400).json({ error: "Usuario Não encontrada" });
    }
});
exports.userShowUnique = userShowUnique;
const userCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (data) {
            const newUser = yield (0, userService_1.createUserService)(data);
            res.status(201).json(newUser);
        }
    }
    catch (error) {
        res.status(404).json({ error: "Erro ao Criar Usuario" });
    }
});
exports.userCreate = userCreate;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, senha } = req.body;
        if (!email || !senha)
            throw new Error("Credenciais não especificadas!");
        const login = yield (0, userService_1.loginService)(email, senha);
        res.status(200).json(login);
    }
    catch (error) {
        res.status(400).json("Login Invalido!");
    }
});
exports.userLogin = userLogin;
const userUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        if (id && data) {
            const updatedUser = yield (0, userService_1.updateUserService)(id, data);
            res.status(200).json(updatedUser);
        }
    }
    catch (error) {
        res.status(400).json({ error: "Dados do Usuario não atualizados" });
    }
});
exports.userUpdate = userUpdate;
const userDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (id) {
            yield (0, userService_1.deleteUserService)(id);
            res.status(200).json("Deletado Com Sucesso");
        }
    }
    catch (error) {
        res.status(400).json({ error: "Não Foi Possivel Deletar a Conta" });
    }
});
exports.userDelete = userDelete;
