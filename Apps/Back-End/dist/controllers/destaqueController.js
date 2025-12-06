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
exports.destaqueDelete = exports.destaqueUpdate = exports.destaqueCreate = exports.destaqueUniqueShow = exports.destaqueShow = void 0;
const destaqueService_1 = require("../services/destaqueService");
const destaqueShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const destaque = yield (0, destaqueService_1.getDestaqueService)();
        res.status(200).json(destaque);
    }
    catch (error) {
        res.status(400).json({ error: "Destaques Não encontrados" });
    }
});
exports.destaqueShow = destaqueShow;
const destaqueUniqueShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (id) {
            const uniqueDestaque = yield (0, destaqueService_1.getUniqueDestaqueService)(id);
            res.status(200).json(uniqueDestaque);
        }
    }
    catch (error) {
        res.status(400).json({ error: "Destaque Não encontrado" });
    }
});
exports.destaqueUniqueShow = destaqueUniqueShow;
const destaqueCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        if (body) {
            const newDestaque = yield (0, destaqueService_1.createDestaqueService)(body);
            res.status(201).json(newDestaque);
        }
    }
    catch (error) {
        res.status(400).json({ error: "Destaque Não Criado" });
    }
});
exports.destaqueCreate = destaqueCreate;
const destaqueUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const body = req.body;
        if (id && body) {
            const updatedDestaque = yield (0, destaqueService_1.updateDestaqueService)(id, body);
            res.status(200).json({ updatedDestaque });
        }
    }
    catch (error) {
        res.status(400).json({ error: "Destaque Não Atualizado" });
    }
});
exports.destaqueUpdate = destaqueUpdate;
const destaqueDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (id) {
            yield (0, destaqueService_1.deleteDestaqueService)(id);
            res.status(200).json({ msg: "Destaque Deletado com Sucesso" });
        }
    }
    catch (error) {
        res.status(400).json({ error: "Destaque não foi Deletado" });
    }
});
exports.destaqueDelete = destaqueDelete;
