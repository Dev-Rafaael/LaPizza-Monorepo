import { PrismaClient } from "@prisma/client";
import { Avaliacao } from "../model/avaliacao-model";

const prisma = new PrismaClient();

export const getAvaliacaoService = async () => {
  try {
    const Avaliacao = await prisma.avaliacao.findMany();
    return Avaliacao;
  } catch (error) {
    console.log(error);
  }
};
export const getUniqueAvaliacaoService = async (id: number) => {
  try {
    const UniqueAvaliacao = await prisma.avaliacao.findUnique({
      where: { id },
    });
    return UniqueAvaliacao;
  } catch (error) {
    console.log(error);
  }
};
export const createAvaliacaoService = async (data: Avaliacao) => {
  try {
    if (data) {
      const newAvaliacao = await prisma.avaliacao.create({ data });
      return newAvaliacao;
    }
  } catch (error) {
    console.log(error);
  }
};
export const updateAvaliacaoService = async (id: number, data: Avaliacao) => {
  try {
    if (id && data) {
      const updatedAvaliacao = await prisma.avaliacao.update({
        where: { id },
        data,
      });
      return updatedAvaliacao;
     } else {
      return "Dados ou Id incorreto";
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteAvaliacaoService = async (id: number) => {
  try {
    if (id) {
      await prisma.avaliacao.delete({
        where: { id },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
