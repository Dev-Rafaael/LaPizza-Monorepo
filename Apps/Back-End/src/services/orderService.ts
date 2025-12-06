import { PrismaClient } from "@prisma/client";
import { Order } from "../model/order-model";
import { io } from "../server";
const prisma = new PrismaClient();

export const getOrderService = async () => {
  try {
    const dataOrder = await prisma.order.findMany({
      include: { items: true, address:true, user:true },
    });
    return dataOrder;
  } catch (error) {
    console.log(error);
  }
};
export const getUniqueOrderService = async (id: number) => {
  try {
    if (id) {
      const dataUniqueOrder = await prisma.order.findUnique({
        where: { id },
        include: { items: true },
      });
      return dataUniqueOrder;
    } else {
      return "Item não encontrado";
    }
  } catch (error) {
    console.log(error);
  }
};
export const createOrderService = async (data: Order) => {
  const { userId, addressId, precoTotal, items } = data;

  if (!addressId || !items || items.length === 0) {
    throw new Error("Dados incompletos para criar pedido");
  }

  const orderData: any = {
    addressId,
    precoTotal,
    status: "PENDENTE",
    items: {
      create: items.map((item) => ({
        pizzaId: item.pizzaId ?? null,
        sabor: item.sabor,
        descricao: item.descricao ?? null,
        imagem: item.imagem ?? null,
        precoUnitario: item.precoUnitario,
        quantidade: item.quantidade,
        precoTotal: item.precoTotal,
        adicionais: item.adicionais ? item.adicionais : null,
      })),
    },
  };

  if (userId) {
    orderData.userId = userId;
  }

  return await prisma.order.create({
    data: orderData,
    include: { items: true },
  });
};

export const updateOrderService = async (id: number, data: Partial<Order>) => {
  try {
    if (!id || !data) throw new Error("Id ou dados inválidos");

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        userId: data.userId,
        addressId: data.addressId,
        precoTotal: data.precoTotal,
        status: data.status,
      },
     
    });
    return updatedOrder;
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    throw new Error("Erro ao atualizar pedido");
  }
};
export async function updateOrderStatus(orderId: number, newStatus: string) {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status: newStatus },
  });


  io.emit("orderStatusUpdated", {
    orderId,
    newStatus,
  });

  return order;
}
export const deleteOrderService = async (id: number) => {
  try {
    if (id) {
      await prisma.order.delete({
        where: { id },
      });
    } else {
      return "Id incorreto";
    }
  } catch (error) {
    console.log(error);
  }
};
