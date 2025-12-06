import { Request, Response } from "express";
import {
  createAddressService,
  deleteAddressService,
  getAddressByUserService,
  getAddressService,
  getAddressUniqueService,
  updateAddressService,
} from "../services/addressService";

export const addressShow = async (req: Request, res: Response) => {
  try {
    const address = await getAddressService();
    res.status(200).json(address);
  } catch (error) {
    res.status(400).json({ error: "Endereço nao encontrado" });
  }
};

export const addressUniqueShow = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (id) {
      const uniqueAddress = await getAddressUniqueService(id);
      res.status(200).json(uniqueAddress);
    }
  } catch (error) {
    res.status(400).json({ error: "Endereço nao encontrado" });
  }
};
export const addressUserShow = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    if (userId) {
      const uniqueAddress = await getAddressByUserService(userId);
      res.status(200).json(uniqueAddress);
    }
  } catch (error) {
    res.status(400).json({ error: "Endereço nao encontrado" });
  }
};
export const addressCreate = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (body) {
      const newAddress = await createAddressService(body);
      res.status(200).json(newAddress);
    }
  } catch (error) {
    res.status(400).json({ error: "Endereço nao Criado" });
  }
};
export const addressUpdate = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const body = req.body;

    if (id && body) {
      const updatedAddress = await updateAddressService(id, body);
      res.status(200).json(updatedAddress);
    }
  } catch (error) {
    res.status(400).json({ error: "Endereço nao Atualizado" });
  }
};
export const addressDelete = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (id) {
      await deleteAddressService(id);
      res.status(200).json({ msg: "Deletado Com Sucesso" });
    }
  } catch (error) {
    res.status(400).json({ error: "Endereço nao Deletado" });
  }
};
