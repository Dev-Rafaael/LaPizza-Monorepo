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
exports.deleteOrderService = exports.updateOrderService = exports.createOrderService = exports.getUniqueOrderService = exports.getOrderService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getOrderService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataOrder = yield prisma.order.findMany();
        return dataOrder;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getOrderService = getOrderService;
const getUniqueOrderService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (id) {
            const dataUniqueOrder = yield prisma.order.findUnique({
                where: { id },
            });
            return dataUniqueOrder;
        }
        else {
            return "Item não encontrado";
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUniqueOrderService = getUniqueOrderService;
const createOrderService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, addressId, precoTotal, items } = data;
    if (!addressId || !items || items.length === 0) {
        throw new Error("Dados incompletos para criar pedido");
    }
    const orderData = {
        addressId,
        precoTotal,
        status: "PENDENTE",
        items: {
            create: items.map(item => {
                var _a, _b, _c;
                return ({
                    pizzaId: (_a = item.pizzaId) !== null && _a !== void 0 ? _a : null,
                    sabor: item.sabor,
                    descricao: (_b = item.descricao) !== null && _b !== void 0 ? _b : null,
                    imagem: (_c = item.imagem) !== null && _c !== void 0 ? _c : null,
                    precoUnitario: item.precoUnitario,
                    quantidade: item.quantidade,
                    precoTotal: item.precoTotal,
                    adicionais: item.adicionais ? item.adicionais : null,
                });
            }),
        },
    };
    // Adiciona userId apenas se existir
    if (userId) {
        orderData.userId = userId;
    }
    return yield prisma.order.create({
        data: orderData,
        include: { items: true },
    });
});
exports.createOrderService = createOrderService;
const updateOrderService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id || !data)
            throw new Error("Id ou dados inválidos");
        const updatedOrder = yield prisma.order.update({
            where: { id },
            data: {
                userId: data.userId,
                addressId: data.addressId,
                precoTotal: data.precoTotal,
                status: data.status,
            },
        });
        return updatedOrder;
    }
    catch (error) {
        console.error("Erro ao atualizar pedido:", error);
        throw new Error("Erro ao atualizar pedido");
    }
});
exports.updateOrderService = updateOrderService;
const deleteOrderService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (id) {
            yield prisma.order.delete({
                where: { id },
            });
        }
        else {
            return "Id incorreto";
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteOrderService = deleteOrderService;
