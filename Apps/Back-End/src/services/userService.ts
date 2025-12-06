import { UserUpdateDTO } from './../model/dtos/user-update.dto';
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

import { User } from "../model/user-model";
import bcrypt from "bcrypt";
import { UserCreateDTO } from "../model/dtos/user-create.dto";
const prisma = new PrismaClient();

const SALT_ROUNDS = 10;
const JWT_SELECT = process.env.JWT_SECRET || "secret";
export const getUserService = async () => {
  try {
    const dataUser = await prisma.user.findMany();
    return dataUser;
  } catch (error) {
    console.log(error);
  }
};
export const getUniqueUserService = async (id: number) => {
  try {
    if (id) {
      const dataUniqueUser = await prisma.user.findUnique({
        where: { id },
      });
      return dataUniqueUser;
    }
  } catch (error) {
    console.log(error);
  }
};
export const createUserService = async (data: UserCreateDTO) => {
  try {
    const emailExist = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (emailExist) {
      throw new Error("Email já cadastrado.");
    }
    console.log("Senha recebida:", data.senha);
    const hashedPassword = await bcrypt.hash(data.senha, SALT_ROUNDS);
    console.log("Senha com hash:", hashedPassword);

    const newUser = await prisma.user.create({
      data: {
        nome: data.nome,
        sobreNome: data.sobreNome,
        email: data.email,
        cpf: data.cpf,
        nascimento:data.nascimento,
        telefone: data.telefone,
        sexo: data.sexo,
        senha: hashedPassword, 
      },
      
      select: { id: true, nome: true, email: true, criadoEm: true } 
    });
    return newUser;
  } catch (error) {
    console.log(error);
  }
};
export const loginService = async (email: string, senha: string) => {
  try {
    const userExist = await prisma.user.findUnique({ where: { email } });
    if (!userExist) throw new Error("Usuário não encontrado");

    const isValid = await bcrypt.compare(senha, userExist.senha);
    if (!isValid) throw new Error("Senha Invalida");

    const token = jwt.sign(
      { id: userExist.id, email: userExist.email },
      JWT_SELECT,
      { expiresIn: "30min" }
    );

    return { user:userExist, token };
  } catch (error) {
    console.log(error);
  }
};
export const updateUserService = async (id: number, data: Partial<UserUpdateDTO>) => {
  try {
    if (id && data) {
      const updatedUser = await prisma.user.update({
        where: { id },
        data,
      });
      return updatedUser;
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteUserService = async (id: number) => {
  try {
    if (id) {
      await prisma.user.delete({
        where: { id },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
