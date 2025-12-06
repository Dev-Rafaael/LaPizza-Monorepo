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
exports.deleteAvaliacaoService = exports.updateAvaliacaoService = exports.createAvaliacaoService = exports.getUniqueAvaliacaoService = exports.getAvaliacaoService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAvaliacaoService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Avaliacao = yield prisma.avaliacao.findMany();
        return Avaliacao;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAvaliacaoService = getAvaliacaoService;
const getUniqueAvaliacaoService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UniqueAvaliacao = yield prisma.avaliacao.findUnique({
            where: { id },
        });
        return UniqueAvaliacao;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUniqueAvaliacaoService = getUniqueAvaliacaoService;
const createAvaliacaoService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (data) {
            const newAvaliacao = yield prisma.avaliacao.create({ data });
            return newAvaliacao;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.createAvaliacaoService = createAvaliacaoService;
const updateAvaliacaoService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (id && data) {
            const updatedAvaliacao = yield prisma.avaliacao.update({
                where: { id },
                data,
            });
            return updatedAvaliacao;
        }
        else {
            return "Dados ou Id incorreto";
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateAvaliacaoService = updateAvaliacaoService;
const deleteAvaliacaoService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (id) {
            yield prisma.avaliacao.delete({
                where: { id },
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteAvaliacaoService = deleteAvaliacaoService;
