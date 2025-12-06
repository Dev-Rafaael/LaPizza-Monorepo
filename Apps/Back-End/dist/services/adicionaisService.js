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
exports.deleteAdicionaisService = exports.updateAdicionaisService = exports.createAdicionaisService = exports.getAdicionaisUniqueService = exports.getAdicionaisService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAdicionaisService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adicionaisData = yield prisma.adicional.findMany();
        return adicionaisData;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAdicionaisService = getAdicionaisService;
const getAdicionaisUniqueService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id)
            return "ID não encontrado";
        const adicionaisUniqueData = yield prisma.adicional.findUnique({
            where: { id }
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAdicionaisUniqueService = getAdicionaisUniqueService;
const createAdicionaisService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data)
            return "Dados Incorretos";
        const newAdicional = yield prisma.adicional.create({ data });
        return newAdicional;
    }
    catch (error) {
        console.log(error);
    }
});
exports.createAdicionaisService = createAdicionaisService;
const updateAdicionaisService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id || !data)
            return "Dados ou Id Incorretos";
        const updatedAdicionais = yield prisma.adicional.update({
            where: { id },
            data
        });
        return updatedAdicionais;
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateAdicionaisService = updateAdicionaisService;
const deleteAdicionaisService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id)
            return "Id Não Passado";
        yield prisma.adicional.delete({
            where: { id }
        });
        return "Deletado Com Sucesso";
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteAdicionaisService = deleteAdicionaisService;
