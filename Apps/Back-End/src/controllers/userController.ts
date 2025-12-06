import {
  createUserService,
  deleteUserService,
  getUniqueUserService,
  getUserService,
  loginService,
  updateUserService,
} from "../services/userService";
import { Request, Response } from "express";
export const userShow = async (req: Request, res: Response) => {
  try {
    const user = await getUserService();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: "Usuario Não encontrado" });
  }
};
export const userShowUnique = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (id) {
      const userUnique = await getUniqueUserService(id);
      res.status(200).json(userUnique);
    }
  } catch (error) {
    res.status(400).json({ error: "Usuario Não encontrada" });
  }
};
export const userCreate = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (data) {
      const newUser = await createUserService(data);
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(404).json({ error: "Erro ao Criar Usuario" });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) throw new Error("Credenciais não especificadas!");
    const login = await loginService(email, senha);
    res.status(200).json(login);
  } catch (error) {
    res.status(400).json("Login Invalido!");
  }
};
export const userUpdate = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    if (id && data) {
      const updatedUser = await updateUserService(id, data);
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(400).json({ error: "Dados do Usuario não atualizados" });
  }
};
export const userDelete = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    if (id) {
      await deleteUserService(id);
      res.status(200).json("Deletado Com Sucesso");
    }
  } catch (error) {
    res.status(400).json({ error: "Não Foi Possivel Deletar a Conta" });
  }
};
