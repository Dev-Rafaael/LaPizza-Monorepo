import { PrismaClient } from "@prisma/client";

import { Address } from "../model/address-model";

const prisma = new PrismaClient();
export const getAddressService = async () => {
  try {
    const addressData = await prisma.address.findMany();
    return addressData;
  } catch (error) {
    console.log(error);
  }
};

export const getAddressUniqueService = async (id: number) => {
  try {
    if (!id) return "ID não encontrado";
    const addressUniqueData = await prisma.address.findUnique({
      where: { id },
    });
    return addressUniqueData;
  } catch (error) {
    console.log(error);
  }
};
export const getAddressByUserService = async (userId: number) => {
  try {
    if (!userId) return "ID não encontrado";
    const addressUniqueData = await prisma.address.findMany({
      where: { userId },
      orderBy: {criadoEm: 'desc'}
    });
    return addressUniqueData;
  } catch (error) {
    console.log(error);
  }
};

export const createAddressService = async (data: Address) => {
  try {
    if (!data) return " Endereco esta incorretos";
    const newAddress = await prisma.address.create({ data});
    return newAddress;
  } catch (error) {
    console.log(error);
  }
};
export const updateAddressService = async (id: number, data: Address) => {
  try {
    if (!id || !data) return "Id ou Data faltando";
    const updatedAddress = await prisma.address.update({
      where: { id },
      data,
    });
    return updatedAddress;
  } catch (error) {
    console.log(error);
  }
};
export const deleteAddressService = async (id: number) => {
  try {
    if (!id) return "Id nao Passado";
    await prisma.address.delete({
      where: { id },
    });
    return "Deletado Com Sucesso";
  } catch (error) {
    console.log(error);
  }
};
