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
exports.orderDelete = exports.orderUpdate = exports.orderCreate = exports.orderShowUnique = exports.orderShow = void 0;
const orderService_1 = require("../services/orderService");
const orderShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = yield (0, orderService_1.getOrderService)();
        res.status(200).json(orderData);
    }
    catch (error) {
        res.status(400).json({ error: "Dados Não encontrados" });
    }
});
exports.orderShow = orderShow;
const orderShowUnique = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (id) {
            const orderUniqueData = yield (0, orderService_1.getUniqueOrderService)(id);
            res.status(200).json(orderUniqueData);
        }
        else {
            res.status(400).json({ message: "Id não encontrado" });
        }
    }
    catch (error) {
        res.status(400).json({ error: "Id não encontrado" });
    }
});
exports.orderShowUnique = orderShowUnique;
const orderCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { addressId, userId, items, precoTotal, status } = req.body;
        if (!addressId || !userId || !(items === null || items === void 0 ? void 0 : items.length)) {
            return res
                .status(400)
                .json({ message: "Dados incompletos para criar o pedido" });
        }
        const newOrder = yield (0, orderService_1.createOrderService)({
            addressId,
            userId,
            items,
            precoTotal,
            status: status || 'PENDENTE',
        });
        res.status(201).json(newOrder);
    }
    catch (error) {
        console.error("Erro ao criar pedido:", error);
        res.status(400).json({ error: "Checkout não foi criado" });
    }
});
exports.orderCreate = orderCreate;
const orderUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const body = req.body;
        if (id && body) {
            const updatedOrder = yield (0, orderService_1.updateOrderService)(id, body);
            res.status(200).json(updatedOrder);
        }
        else {
            res.status(400).json({ message: "Dados Incompletos" });
        }
    }
    catch (error) {
        res.status(400).json({ error: "Checkout não foi Atualizado" });
    }
});
exports.orderUpdate = orderUpdate;
const orderDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (id) {
            yield (0, orderService_1.deleteOrderService)(id);
            res.status(200).json({ message: "Dados Deletados Com sucesso" });
        }
        else {
            res.status(400).json({ message: "Id não encontrado" });
        }
    }
    catch (error) {
        res.status(400).json({ error: "Checkout não foi deletado" });
    }
});
exports.orderDelete = orderDelete;
