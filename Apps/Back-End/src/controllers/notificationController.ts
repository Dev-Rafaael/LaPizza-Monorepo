import { Request, Response } from "express";
import {
  createNotificationService,
  deleteNotificationService,
  getNotificationService,
  getUniqueNotificationService,
  updateNotificationService,
} from "../services/notificationService";

export const notificationShow = async (req: Request, res: Response) => {
  try {
    const notificationData = await getNotificationService();
    res.status(200).json(notificationData);
  } catch (error) {
    res.status(404).json({ err: "Erro ao Buscar Notificação" });
  }
};
export const notificationUniqueShow = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    if (id) {
      const notificationUniqueData = await getUniqueNotificationService(id);
      res.status(200).json(notificationUniqueData);
    } else {
      res.status(400).json("Id Não Encontrado");
    }
  } catch (error) {
    res.status(400).json({ err: "Erro ao Buscar Notificação" });
  }
};
export const notificationCreate = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (body) {
      const createNotification = await createNotificationService(body);
      res.status(200).json(createNotification);
    } else {
      res.status(400).json("Dados Não Informados");
    }
  } catch (error) {
    res.status(400).json({ err: "Erro ao Criar Notificação" });
  }
};
export const notificationUpdate = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const body = req.body;
    if (id && body) {
      const updatedNotification = await updateNotificationService(id, body);
      res.status(200).json(updatedNotification);
    } else {
      res.status(400).json("Id ou Dados Não Fornecidos");
    }
  } catch (error) {
    res.status(400).json({ err: "Erro ao Atualizar Notificação" });
  }
};
export const notificationDelete = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (id) {
      await deleteNotificationService(id);
      res.status(200).json({ msg: "Deletado Com Sucesso" });
    } else {
      res.status(400).json("Id não encontrado");
    }
  } catch (error) {
    res.status(400).json({ err: "Erro ao Deletar Notificação" });
  }
};
