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
exports.deleteOrderItemService = exports.updateOrderItemService = exports.createOrderItemService = exports.getUniqueOrderItemService = exports.getOrderItemService = void 0;
const client_1 = require("@prisma/client");
const mapOrderItemToPrismaData_1 = require("../utils/mapOrderItemToPrismaData");
const prisma = new client_1.PrismaClient();
const getOrderItemService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orcamentoData = yield prisma.orderItem.findMany();
        return orcamentoData;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getOrderItemService = getOrderItemService;
const getUniqueOrderItemService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (id) {
            const dataUniqueOrderItem = yield prisma.orderItem.findUnique({
                where: { id },
            });
            return dataUniqueOrderItem;
        }
        else {
            return "Id não encontrado";
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUniqueOrderItemService = getUniqueOrderItemService;
// No seu service
const createOrderItemService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrderItem = yield prisma.orderItem.create({
            data: (0, mapOrderItemToPrismaData_1.mapOrderItemToPrismaData)(data),
        });
        return newOrderItem;
    }
    catch (error) {
        console.log(error);
    }
});
exports.createOrderItemService = createOrderItemService;
const updateOrderItemService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (id && data) {
            const updatedOrderItem = yield prisma.orderItem.update({
                where: { id },
                data: (0, mapOrderItemToPrismaData_1.mapOrderItemToPrismaData)(data)
            });
            return updatedOrderItem;
        }
        else {
            return "Dados ou Id Invalido";
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateOrderItemService = updateOrderItemService;
const deleteOrderItemService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (id) {
            yield prisma.orderItem.delete({
                where: { id },
            });
        }
        else {
            return "Id nã encontradoo";
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteOrderItemService = deleteOrderItemService;
