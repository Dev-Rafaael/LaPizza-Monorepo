import { Request, Response } from "express";
import { createAdicionaisService, deleteAdicionaisService, getAdicionaisService, getAdicionaisUniqueService, updateAdicionaisService } from "../services/adicionaisService";


export const adicionaisShow = async (req: Request, res: Response) => {
    try {
        const adicionais = await getAdicionaisService()
        res.status(200).json(adicionais)
    } catch (error) {
        res.status(400).json({err:'Adicional Não encontrado'})
    }
}

export const adicionaisUniqueShow = async (req: Request, res: Response) => {
     try {
        const id = parseInt(req.params.id)
        if(id){
            const adicional = await getAdicionaisUniqueService(id)
            res.status(200).json(adicional)
        } else {
        res.status(400).json({ message: "Id não encontrado" });
        }
    } catch (error) {
        res.status(400).json({err:'Adicional Não encontrado'})
    }
}


export const adicionaisCreate = async (req: Request, res: Response) => {
     try {
        const body = req.body
        if (body) {
            const newAdicional = await createAdicionaisService(body)
            res.status(200).json(newAdicional)
        } else {
             res.status(400).json({message: 'Dados Incompletos'}) 
        }
    } catch (error) {
      res.status(400).json({error:'Não foi possivel Criar Adicional'})
    }
}

export const adicionaisUpdate = async (req: Request, res: Response) => {
     try {
        const id = parseInt(req.params.id)
        const body = req.body
        if (id && body) {
            const updatedAdicional = await updateAdicionaisService(id,body)
            res.status(200).json(updatedAdicional)
        } else {
             res.status(400).json({message: 'Dados Incompletos'}) 
        }
    } catch (error) {
       res.status(400).json({error:'Não foi possivel Atualizar Adicional'})
    }
}
export const adicionaisDelete = async (req: Request, res: Response) => {
     try {
        const id = parseInt(req.params.id)
        if (id) {
            await deleteAdicionaisService(id)
            res.status(200).json({msg:'Deletado Com Sucesso'})
        } else {
             res.status(400).json({message: 'Dados Incompletos'}) 
        }
    } catch (error) {
    res.status(400).json({error:'Não foi possivel Deletar o Adicional'})
    }
}