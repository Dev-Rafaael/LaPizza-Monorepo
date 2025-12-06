import { OrderItem } from "../model/orderItem-model";

export const mapOrderItemToPrismaData = (data: OrderItem) => ({
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
