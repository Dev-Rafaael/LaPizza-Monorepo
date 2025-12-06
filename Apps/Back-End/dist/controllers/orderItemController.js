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
exports.orderItemDelete = exports.orderItemUpdate = exports.orderItemCreate = exports.orderItemShowUnique = exports.orderItemShow = void 0;
const orderItemService_1 = require("../services/orderItemService");
const orderItemShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderItemData = yield (0, orderItemService_1.getOrderItemService)();
        res.status(200).json(orderItemData);
    }
    catch (error) {
        res.status(400).json({ error: 'Dados Não encontrados' });
    }
});
exports.orderItemShow = orderItemShow;
const orderItemShowUnique = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (id) {
            const orderItemUniqueData = yield (0, orderItemService_1.getUniqueOrderItemService)(id);
            res.status(200).json(orderItemUniqueData);
        }
        else {
            res.status(400).json({ message: 'Id não encontrado' });
        }
    }
    catch (error) {
        res.status(400).json({ error: 'Dados Não encontrados' });
    }
});
exports.orderItemShowUnique = orderItemShowUnique;
const orderItemCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        if (body) {
            const newOrderItem = yield (0, orderItemService_1.createOrderItemService)(body);
            res.status(201).json(newOrderItem);
        }
        else {
            res.status(400).json({ message: 'Dados Incompletos' });
        }
    }
    catch (error) {
        res.status(400).json({ error: 'Não foi possivel Criar Orcamento' });
    }
});
exports.orderItemCreate = orderItemCreate;
const orderItemUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const body = req.body;
        if (id && body) {
            const updatedOrderItem = (0, orderItemService_1.updateOrderItemService)(id, body);
            res.status(200).json(updatedOrderItem);
        }
        else {
            res.status(400).json({ message: 'Dados Incompletos' });
        }
    }
    catch (error) {
        res.status(400).json({ error: 'Não foi possivel Atualizar Orcamento' });
    }
});
exports.orderItemUpdate = orderItemUpdate;
const orderItemDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (id) {
            yield (0, orderItemService_1.deleteOrderItemService)(id);
            res.status(200).json({ message: 'Orcamento Deletado com Sucesso' });
        }
        else {
            res.status(400).json({ message: 'Id não encontrado' });
        }
    }
    catch (error) {
        res.status(400).json({ message: 'Não foi possivel Deletar Orcamento' });
    }
});
exports.orderItemDelete = orderItemDelete;
