import { PrismaClient } from "@prisma/client";
import { Adicional } from "../model/adicionais-model";

const prisma = new PrismaClient();

export const getAdicionaisService = async () => {
  try {
    const adicionaisData = await prisma.adicional.findMany()
    return adicionaisData
  } catch (error) {
    console.log(error);
  }
};
export const getAdicionaisUniqueService = async (id: number) => {
  try {
    if(!id)return "ID não encontrado";
    const  adicionaisUniqueData = await prisma.adicional.findUnique({
        where: {id}
    })
  } catch (error) {
    console.log(error);
  }
};
export const createAdicionaisService = async (data: Adicional) => {
  try {
    if(!data) return "Dados Incorretos"
    const newAdicional = await prisma.adicional.create({data})
    return newAdicional
  } catch (error) {
    console.log(error);
  }
};
export const updateAdicionaisService = async (id: number, data: Adicional) => {
  try {
    if(!id || !data) return "Dados ou Id Incorretos"
    const updatedAdicionais = await prisma.adicional.update({
        where: {id},
        data
    })
    return updatedAdicionais
  } catch (error) {
    console.log(error);
  }
};

export const deleteAdicionaisService = async (id: number) => {
  try {
    if(!id) return "Id Não Passado"
    await prisma.adicional.delete({
        where: {id}
    })
     return "Deletado Com Sucesso";
  } catch (error) {
    console.log(error);
  }
};
