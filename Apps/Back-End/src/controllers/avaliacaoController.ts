import { Request, Response } from "express";
import {
  createAvaliacaoService,
  deleteAvaliacaoService,
  getAvaliacaoService,
  getUniqueAvaliacaoService,
  updateAvaliacaoService,
} from "../services/avaliacaoService";

export const avaliacaoShow = async (req: Request, res: Response) => {
  try {
    const avaliacao = await getAvaliacaoService();
    res.status(200).json(avaliacao);
  } catch (error) {
    res.status(400).json({ error: "Avaliacões Não encontradas" });
  }
};
export const avaliacaoUniqueShow = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (id) {
      const uniqueAvaliacao = await getUniqueAvaliacaoService(id);
      res.status(200).json(uniqueAvaliacao);
    }
  } catch (error) {
    res.status(400).json({ error: "Avaliação Não encontrada" });
  }
};
export const avaliacaoCreate = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    if (body) {
      const newAvaliacao = await createAvaliacaoService(body);
      res.status(201).json(newAvaliacao);
    }
  } catch (error) {
    res.status(400).json({ error: "Não foi possivel criar a Avaliação" });
  }
};
export const avaliacaoUpdate = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const body = req.body;
    if (id && body) {
      const updatedAvaliacao = await updateAvaliacaoService(id, body);
      res.status(200).json(updatedAvaliacao);
    }
  } catch (error) {
    res.status(400).json({ error: "Não foi possivel atualizar a avaliação" });
  }
};
export const avaliacaoDelete = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (id) {
      await deleteAvaliacaoService(id);
      res.status(200).json({ msg: "Avaliação Deletada com Sucesso" });
    }
  } catch (error) {
    res.status(400).json({ error: "Não Foi possivel Deletar a Avaliação" });
  }
};
