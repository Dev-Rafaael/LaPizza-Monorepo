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
exports.deleteAddressService = exports.updateAddressService = exports.createAddressService = exports.getAddressByUserService = exports.getAddressUniqueService = exports.getAddressService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAddressService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addressData = yield prisma.address.findMany();
        return addressData;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAddressService = getAddressService;
const getAddressUniqueService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id)
            return "ID não encontrado";
        const addressUniqueData = yield prisma.address.findUnique({
            where: { id },
        });
        return addressUniqueData;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAddressUniqueService = getAddressUniqueService;
const getAddressByUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userId)
            return "ID não encontrado";
        const addressUniqueData = yield prisma.address.findMany({
            where: { userId },
            orderBy: { criadoEm: 'desc' }
        });
        return addressUniqueData;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAddressByUserService = getAddressByUserService;
const createAddressService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data)
            return " Endereco esta incorretos";
        const newAddress = yield prisma.address.create({ data });
        return newAddress;
    }
    catch (error) {
        console.log(error);
    }
});
exports.createAddressService = createAddressService;
const updateAddressService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id || !data)
            return "Id ou Data faltando";
        const updatedAddress = yield prisma.address.update({
            where: { id },
            data,
        });
        return updatedAddress;
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateAddressService = updateAddressService;
const deleteAddressService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id)
            return "Id nao Passado";
        yield prisma.address.delete({
            where: { id },
        });
        return "Deletado Com Sucesso";
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteAddressService = deleteAddressService;
