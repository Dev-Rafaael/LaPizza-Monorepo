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
exports.contatoDelete = exports.contatoUpdate = exports.contatoCreate = exports.contatoUniqueShow = exports.contatoShow = void 0;
const contatoService_1 = require("../services/contatoService");
const contatoShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contatos = yield (0, contatoService_1.getContatosService)();
        res.status(200).json(contatos);
    }
    catch (error) {
        res.status(400).json({ error: "Contato Não Encontrado" });
    }
});
exports.contatoShow = contatoShow;
const contatoUniqueShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (id) {
            const contatosUnique = yield (0, contatoService_1.getUniqueContatoService)(id);
            res.status(200).json(contatosUnique);
        }
    }
    catch (error) {
        res.status(400).json({ error: "Contato Não Encontrado" });
    }
});
exports.contatoUniqueShow = contatoUniqueShow;
const contatoCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (data) {
            const newContact = yield (0, contatoService_1.createContatoService)(data);
            res.status(201).json(newContact);
        }
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao criar contato" });
    }
});
exports.contatoCreate = contatoCreate;
const contatoUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dados = req.body;
        const id = parseInt(req.params.id);
        if (dados && id) {
            const updatedContact = yield (0, contatoService_1.updateContatoService)(id, dados);
            res.status(200).json(updatedContact);
        }
    }
    catch (error) {
        res.status(400).json({ error: "Erro Ao atualizar" });
    }
});
exports.contatoUpdate = contatoUpdate;
const contatoDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (id) {
            yield (0, contatoService_1.deleteContatoService)(id);
            res.status(200).json("Deletado Com Sucesso");
        }
    }
    catch (error) {
        res.status(400).json({ error: "Erro Ao Deletar" });
    }
});
exports.contatoDelete = contatoDelete;
