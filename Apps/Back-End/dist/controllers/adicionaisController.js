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
exports.adicionaisDelete = exports.adicionaisUpdate = exports.adicionaisCreate = exports.adicionaisUniqueShow = exports.adicionaisShow = void 0;
const adicionaisService_1 = require("../services/adicionaisService");
const adicionaisShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adicionais = yield (0, adicionaisService_1.getAdicionaisService)();
        res.status(200).json(adicionais);
    }
    catch (error) {
        res.status(400).json({ err: 'Adicional Não encontrado' });
    }
});
exports.adicionaisShow = adicionaisShow;
const adicionaisUniqueShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (id) {
            const adicional = yield (0, adicionaisService_1.getAdicionaisUniqueService)(id);
            res.status(200).json(adicional);
        }
        else {
            res.status(400).json({ message: "Id não encontrado" });
        }
    }
    catch (error) {
        res.status(400).json({ err: 'Adicional Não encontrado' });
    }
});
exports.adicionaisUniqueShow = adicionaisUniqueShow;
const adicionaisCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        if (body) {
            const newAdicional = yield (0, adicionaisService_1.createAdicionaisService)(body);
            res.status(200).json(newAdicional);
        }
        else {
            res.status(400).json({ message: 'Dados Incompletos' });
        }
    }
    catch (error) {
        res.status(400).json({ error: 'Não foi possivel Criar Adicional' });
    }
});
exports.adicionaisCreate = adicionaisCreate;
const adicionaisUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const body = req.body;
        if (id && body) {
            const updatedAdicional = yield (0, adicionaisService_1.updateAdicionaisService)(id, body);
            res.status(200).json(updatedAdicional);
        }
        else {
            res.status(400).json({ message: 'Dados Incompletos' });
        }
    }
    catch (error) {
        res.status(400).json({ error: 'Não foi possivel Atualizar Adicional' });
    }
});
exports.adicionaisUpdate = adicionaisUpdate;
const adicionaisDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (id) {
            yield (0, adicionaisService_1.deleteAdicionaisService)(id);
            res.status(200).json({ msg: 'Deletado Com Sucesso' });
        }
        else {
            res.status(400).json({ message: 'Dados Incompletos' });
        }
    }
    catch (error) {
        res.status(400).json({ error: 'Não foi possivel Deletar o Adicional' });
    }
});
exports.adicionaisDelete = adicionaisDelete;
