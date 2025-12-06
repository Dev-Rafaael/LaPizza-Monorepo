import { Request, Response } from "express";
import {
  createDestaqueService,
  deleteDestaqueService,
  getDestaqueService,
  getUniqueDestaqueService,
  updateDestaqueService,
} from "../services/destaqueService";

export const destaqueShow = async (req: Request, res: Response) => {
  try {
    const destaque = await getDestaqueService();
    res.status(200).json(destaque);
  } catch (error) {
    res.status(400).json({ error: "Destaques Não encontrados" });
  }
};
export const destaqueUniqueShow = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (id) {
      const uniqueDestaque = await getUniqueDestaqueService(id);
      res.status(200).json(uniqueDestaque);
    }
  } catch (error) {
    res.status(400).json({ error: "Destaque Não encontrado" });
  }
};
export const destaqueCreate = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (body) {
      const newDestaque = await createDestaqueService(body);
      res.status(201).json(newDestaque);
    }
  } catch (error) {
    res.status(400).json({ error: "Destaque Não Criado" });
  }
};
export const destaqueUpdate = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const body = req.body;

    if (id && body) {
      const updatedDestaque = await updateDestaqueService(id, body);
      res.status(200).json({ updatedDestaque });
    }
  } catch (error) {
    res.status(400).json({ error: "Destaque Não Atualizado" });
  }
};
export const destaqueDelete = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (id) {
      await deleteDestaqueService(id);
      res.status(200).json({ msg: "Destaque Deletado com Sucesso" });
    }
  } catch (error) {
    res.status(400).json({ error: "Destaque não foi Deletado" });
  }
};
