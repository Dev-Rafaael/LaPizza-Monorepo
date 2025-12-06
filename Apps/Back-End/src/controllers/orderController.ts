import { Request, Response } from "express";
import {
  createOrderService,
  deleteOrderService,
  getOrderService,
  getUniqueOrderService,
   updateOrderService,
   updateOrderStatus,
} from "../services/orderService";

export const orderShow = async (req: Request, res: Response) => {
  try {
    const orderData = await getOrderService();
    res.status(200).json(orderData);
  } catch (error) {
    res.status(400).json({ error: "Dados Não encontrados" });
  }
};
export const orderShowUnique = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (id) {
      const orderUniqueData = await getUniqueOrderService(id);
      res.status(200).json(orderUniqueData);
    } else {
      res.status(400).json({ message: "Id não encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: "Id não encontrado" });
  }
};
export const orderCreate = async (req: Request, res: Response) => {
  try {
    const { addressId, userId, items, precoTotal, status } = req.body;

    if (!addressId || !userId || !items?.length) {
      return res
        .status(400)
        .json({ message: "Dados incompletos para criar o pedido" });
    }

    const newOrder = await createOrderService({
      addressId,
      userId,
      items,
      precoTotal,
      status : status || 'PENDENTE',
    });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res.status(400).json({ error: "Checkout não foi criado" });
  }
};

export const orderUpdate = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const body = req.body;
    if (id && body) {
      const updatedOrder = await updateOrderService(id, body);
      res.status(200).json(updatedOrder);
    } else {
      res.status(400).json({ message: "Dados Incompletos" });
    }
  } catch (error) {
    res.status(400).json({ error: "Checkout não foi Atualizado" });
  }
};

export const updateOrderStatusController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ message: "ID e status são obrigatórios" });
    }

    const updated = await updateOrderStatus(id, status);

    return res.json({
      message: "Status atualizado com sucesso",
      order: updated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro ao atualizar status" });
  }
};

export const orderDelete = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (id) {
      await deleteOrderService(id);
      res.status(200).json({ message: "Dados Deletados Com sucesso" });
    } else {
      res.status(400).json({ message: "Id não encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: "Checkout não foi deletado" });
  }
};
