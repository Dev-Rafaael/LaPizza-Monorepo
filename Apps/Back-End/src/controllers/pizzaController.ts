import { Request, Response } from "express";
import { createPizzaService, deletePizzaService, getPizzaService,searchPizzaService, updatePizzaService } from "../services/pizzaService";


export const pizzaShow = async (req: Request, res: Response) => {
    try {
        const pizzasData = await getPizzaService()
        res.status(200).json(pizzasData)
    } catch (error) {
        res.status(400).json({error: 'Pizza não encontrada'})
    }
}
export const pizzaSearch = async (req: Request, res: Response) => {
  try {
    const sabor = req.params.sabor;
    const pizzasUniqueData = await searchPizzaService(sabor);
    res.status(200).json(pizzasUniqueData);
  } catch (error) {
    res.status(400).json({ error: 'Pizza não encontrada' });
  }
};
export const pizzaCreate = async (req: Request, res: Response) => {
  try {
    const pizza = await createPizzaService(req.body);
    res.status(201).json(pizza);
  } catch (error: unknown) {
    res.status(400).json({ error: (error as Error).message });
  }
};


export const pizzaUpdate = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const pizza = await updatePizzaService(id, req.body);
    res.status(200).json(pizza);
  } catch (error: unknown) {
    res.status(400).json({ error: (error as Error).message });
  }
};


export const pizzaDelete = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await deletePizzaService(id);
    res.status(200).json(result);
  } catch (error: unknown) {
    res.status(400).json({ error: (error as Error).message });
  }
};
