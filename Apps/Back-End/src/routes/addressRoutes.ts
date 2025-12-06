import { Router } from "express";
import { addressCreate, addressDelete, addressShow, addressUniqueShow, addressUpdate, addressUserShow } from "../controllers/addressController";



const addressRotas = Router()


addressRotas.get('/',addressShow)
addressRotas.get('/:id',addressUniqueShow)
addressRotas.get('/user/:userId',addressUserShow)
addressRotas.post('/',addressCreate)
addressRotas.put('/:id',addressUpdate)
addressRotas.delete('/:id',addressDelete)


export default addressRotas