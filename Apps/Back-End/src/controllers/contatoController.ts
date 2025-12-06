import { Request, Response } from "express";
import {
  createContatoService,
  deleteContatoService,
  getContatosService,
  getUniqueContatoService,
  updateContatoService,
} from "../services/contatoService";

export const contatoShow = async (req: Request, res: Response) => {
  try {
    const contatos = await getContatosService();
    res.status(200).json(contatos);
  } catch (error) {
    res.status(400).json({ error: "Contato Não Encontrado" });
  }
};

export const contatoUniqueShow = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (id) {
      const contatosUnique = await getUniqueContatoService(id);
      res.status(200).json(contatosUnique);
    }
  } catch (error) {
    res.status(400).json({ error: "Contato Não Encontrado" });
  }
};

export const contatoCreate = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (data) {
      const newContact = await createContatoService(data);
      res.status(201).json(newContact);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar contato" });
  }
};

export const contatoUpdate = async (req: Request, res: Response) => {
  try {
    const dados = req.body;
    const id = parseInt(req.params.id);

    if (dados && id) {
      const updatedContact = await updateContatoService(id, dados);
      res.status(200).json(updatedContact);
    }
  } catch (error) {
    res.status(400).json({ error: "Erro Ao atualizar" });
  }
};

export const contatoDelete = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    if (id) {
      await deleteContatoService(id);
      res.status(200).json("Deletado Com Sucesso");
    }
  } catch (error) {
    res.status(400).json({ error: "Erro Ao Deletar" });
  }
};
