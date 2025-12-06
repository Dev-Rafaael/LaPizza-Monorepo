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
exports.deleteDestaqueService = exports.updateDestaqueService = exports.createDestaqueService = exports.getUniqueDestaqueService = exports.getDestaqueService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getDestaqueService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataDestaque = yield prisma.destaque.findMany();
        return dataDestaque;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getDestaqueService = getDestaqueService;
const getUniqueDestaqueService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (id) {
            const dataUniqueDestaque = yield prisma.destaque.findUnique({
                where: { id },
            });
            return dataUniqueDestaque;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUniqueDestaqueService = getUniqueDestaqueService;
const createDestaqueService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (data) {
            const newDestaque = yield prisma.destaque.create({ data });
            return newDestaque;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.createDestaqueService = createDestaqueService;
const updateDestaqueService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (id && data) {
            const updateDestaque = yield prisma.destaque.update({
                where: { id },
                data,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateDestaqueService = updateDestaqueService;
const deleteDestaqueService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (id) {
            yield prisma.destaque.delete({
                where: { id },
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteDestaqueService = deleteDestaqueService;
