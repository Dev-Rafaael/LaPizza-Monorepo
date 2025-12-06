import { Router } from "express"
import {
  orderShow,
  orderShowUnique,
  orderCreate,
 orderUpdate,
  orderDelete,
  updateOrderStatusController
} from "../controllers/orderController"

const orderRotas = Router()

orderRotas.get('/', orderShow)
orderRotas.get('/:id', orderShowUnique)
orderRotas.post('/', orderCreate)
 orderRotas.put('/:id', orderUpdate)
orderRotas.put("/:id/status", updateOrderStatusController);
orderRotas.delete('/:id', orderDelete)

export default orderRotas
