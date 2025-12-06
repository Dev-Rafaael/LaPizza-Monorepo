"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapOrderItemToPrismaData = void 0;
const mapOrderItemToPrismaData = (data) => ({
    orderId: data.orderId,
    pizzaId: data.pizzaId,
    sabor: data.sabor,
    descricao: data.descricao,
    imagem: data.imagem,
    precoUnitario: data.precoUnitario,
    quantidade: data.quantidade,
    precoTotal: data.precoTotal,
    adicionais: JSON.parse(JSON.stringify(data.adicionais)),
});
exports.mapOrderItemToPrismaData = mapOrderItemToPrismaData;
