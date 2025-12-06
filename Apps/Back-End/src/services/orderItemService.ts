import { PrismaClient } from "@prisma/client";
import { OrderItem } from "../model/orderItem-model";
import { mapOrderItemToPrismaData } from "../utils/mapOrderItemToPrismaData";


const prisma = new PrismaClient();

export const getOrderItemService = async () => {
  try {
    const orcamentoData = await prisma.orderItem.findMany();
    return orcamentoData;
  } catch (error) {
    console.log(error);
  }
};
export const getUniqueOrderItemService = async (id: number) => {
  try {
    if (id) {
      const dataUniqueOrderItem = await prisma.orderItem.findUnique({
        where: { id },
      });
      return dataUniqueOrderItem
    } else {
      return "Id não encontrado";
    }
  } catch (error) {
    console.log(error);
  }
};
// No seu service
export const createOrderItemService = async (data: OrderItem) => {
  try {
    const newOrderItem = await prisma.orderItem.create({
      data: mapOrderItemToPrismaData(data),
    });
    return newOrderItem;
  } catch (error) {
    console.log(error);
  }
};




export const updateOrderItemService = async (id: number, data: OrderItem) => {
  try {
    if (id && data) {
      const updatedOrderItem = await prisma.orderItem.update({
        where: { id },
        data: mapOrderItemToPrismaData(data)
      });
      return updatedOrderItem
    } else {
      return "Dados ou Id Invalido";
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteOrderItemService = async (id: number) => {
  try {
    if (id) {
      await prisma.orderItem.delete({
        where: { id },
      });
    } else {
      return "Id nã encontradoo";
    }
  } catch (error) {
    console.log(error);
  }
};
