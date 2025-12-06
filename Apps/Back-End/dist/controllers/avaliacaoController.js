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
exports.avaliacaoDelete = exports.avaliacaoUpdate = exports.avaliacaoCreate = exports.avaliacaoUniqueShow = exports.avaliacaoShow = void 0;
const avaliacaoService_1 = require("../services/avaliacaoService");
const avaliacaoShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const avaliacao = yield (0, avaliacaoService_1.getAvaliacaoService)();
        res.status(200).json(avaliacao);
    }
    catch (error) {
        res.status(400).json({ error: "Avaliacões Não encontradas" });
    }
});
exports.avaliacaoShow = avaliacaoShow;
const avaliacaoUniqueShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (id) {
            const uniqueAvaliacao = yield (0, avaliacaoService_1.getUniqueAvaliacaoService)(id);
            res.status(200).json(uniqueAvaliacao);
        }
    }
    catch (error) {
        res.status(400).json({ error: "Avaliação Não encontrada" });
    }
});
exports.avaliacaoUniqueShow = avaliacaoUniqueShow;
const avaliacaoCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        if (body) {
            const newAvaliacao = yield (0, avaliacaoService_1.createAvaliacaoService)(body);
            res.status(201).json(newAvaliacao);
        }
    }
    catch (error) {
        res.status(400).json({ error: "Não foi possivel criar a Avaliação" });
    }
});
exports.avaliacaoCreate = avaliacaoCreate;
const avaliacaoUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const body = req.body;
        if (id && body) {
            const updatedAvaliacao = yield (0, avaliacaoService_1.updateAvaliacaoService)(id, body);
            res.status(200).json(updatedAvaliacao);
        }
    }
    catch (error) {
        res.status(400).json({ error: "Não foi possivel atualizar a avaliação" });
    }
});
exports.avaliacaoUpdate = avaliacaoUpdate;
const avaliacaoDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (id) {
            yield (0, avaliacaoService_1.deleteAvaliacaoService)(id);
            res.status(200).json({ msg: "Avaliação Deletada com Sucesso" });
        }
    }
    catch (error) {
        res.status(400).json({ error: "Não Foi possivel Deletar a Avaliação" });
    }
});
exports.avaliacaoDelete = avaliacaoDelete;
