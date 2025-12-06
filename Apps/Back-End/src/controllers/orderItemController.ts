import { Request, Response } from "express";
import { createOrderItemService, deleteOrderItemService, getOrderItemService, getUniqueOrderItemService, updateOrderItemService } from "../services/orderItemService";

export const orderItemShow = async (req: Request, res: Response) => {
    try {
        const orderItemData = await getOrderItemService()
        res.status(200).json(orderItemData)
    } catch (error) {
        res.status(400).json({error:'Dados Não encontrados'})
    }
}
export const orderItemShowUnique = async (req: Request, res: Response) => {
     try {
        const id = parseInt(req.params.id) 
        if (id) {
            const orderItemUniqueData = await getUniqueOrderItemService(id)
            res.status(200).json(orderItemUniqueData)
        } else {
            res.status(400).json({message:'Id não encontrado'})
        }
    } catch (error) {
        res.status(400).json({error:'Dados Não encontrados'})
    }
}
export const orderItemCreate = async (req: Request, res: Response) => {
     try {
        const body = req.body

        if(body){
            const newOrderItem = await createOrderItemService(body)
            res.status(201).json(newOrderItem)
        }else{
            res.status(400).json({message: 'Dados Incompletos'})
        }
    } catch (error) {
         res.status(400).json({error:'Não foi possivel Criar Orcamento'})
    }
}
export const orderItemUpdate = async (req: Request, res: Response) => {
     try {
        const id = parseInt(req.params.id) 
        const body = req.body

        if(id && body){
            const updatedOrderItem = updateOrderItemService(id,body)
            res.status(200).json(updatedOrderItem)
        }else{
            res.status(400).json({message: 'Dados Incompletos'})
        }
    } catch (error) {
        res.status(400).json({error:'Não foi possivel Atualizar Orcamento'})
    }
}

export const orderItemDelete = async (req: Request, res: Response) => {
     try {
        const id = parseInt(req.params.id) 
        if (id) {
            await deleteOrderItemService(id)
            res.status(200).json({message: 'Orcamento Deletado com Sucesso'})
        } else {
            res.status(400).json({message:'Id não encontrado'})
        }
    } catch (error) {
        res.status(400).json({message:'Não foi possivel Deletar Orcamento'})
    }
}