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
exports.deleteContatoService = exports.updateContatoService = exports.createContatoService = exports.getUniqueContatoService = exports.getContatosService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getContatosService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contatos = yield prisma.contato.findMany();
        return contatos;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getContatosService = getContatosService;
const getUniqueContatoService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = yield prisma.contato.findUnique({
            where: { id }
        });
        return contact;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUniqueContatoService = getUniqueContatoService;
const createContatoService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataContato = yield prisma.contato.create({ data });
        return dataContato;
    }
    catch (error) {
        console.log(error);
    }
});
exports.createContatoService = createContatoService;
const updateContatoService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedContato = yield prisma.contato.update({
            where: { id },
            data: data
        });
        return updatedContato;
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateContatoService = updateContatoService;
const deleteContatoService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.contato.delete({
            where: { id }
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteContatoService = deleteContatoService;
