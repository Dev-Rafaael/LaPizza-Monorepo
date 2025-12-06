import { PrismaClient } from "@prisma/client";
import { Destaque } from "../model/destaque-model";

const prisma = new PrismaClient();
export const getDestaqueService = async () => {
  try {
    const dataDestaque = await prisma.destaque.findMany();
    return dataDestaque;
  } catch (error) {
    console.log(error);
  }
};
export const getUniqueDestaqueService = async (id: number) => {
  try {
    if (id) {
      const dataUniqueDestaque = await prisma.destaque.findUnique({
        where: { id },
      });
      return dataUniqueDestaque;
    }
  } catch (error) {
    console.log(error);
  }
};
export const createDestaqueService = async (data: Destaque) => {
  try {
    if (data) {
      const newDestaque = await prisma.destaque.create({ data });
      return newDestaque;
    }
  } catch (error) {
    console.log(error);
  }
};
export const updateDestaqueService = async (id: number, data: Destaque) => {
  try {
    if (id && data) {
      const updateDestaque = await prisma.destaque.update({
        where: { id },
        data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteDestaqueService = async (id: number) => {
  try {
    if (id) {
      await prisma.destaque.delete({
        where: { id },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
