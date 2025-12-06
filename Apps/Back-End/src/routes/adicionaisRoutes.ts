import { Router } from "express";
import { adicionaisCreate, adicionaisDelete, adicionaisShow, adicionaisUniqueShow, adicionaisUpdate } from "../controllers/adicionaisController";




const adicionaisRotas = Router()


adicionaisRotas.get('/',adicionaisShow)
adicionaisRotas.get('/:id',adicionaisUniqueShow)
adicionaisRotas.post('/',adicionaisCreate)
adicionaisRotas.put('/:id',adicionaisUpdate)
adicionaisRotas.delete('/:id',adicionaisDelete)


export default adicionaisRotas