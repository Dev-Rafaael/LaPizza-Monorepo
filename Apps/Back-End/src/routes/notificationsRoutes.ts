import { Router } from "express";
import { notificationCreate, notificationDelete, notificationShow, notificationUniqueShow, notificationUpdate } from "../controllers/notificationController";



const notificationRotas =  Router()

notificationRotas.get('/',notificationShow)
notificationRotas.get('/:id',notificationUniqueShow)
notificationRotas.post('/',notificationCreate)
notificationRotas.put('/:id',notificationUpdate)
notificationRotas.delete('/:id',notificationDelete)


export default notificationRotas