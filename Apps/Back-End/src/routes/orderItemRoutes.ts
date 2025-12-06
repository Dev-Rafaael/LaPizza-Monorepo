import { Router } from "express"
import {
  orderItemShow,
  orderItemShowUnique,
  orderItemCreate,
  orderItemUpdate,
  orderItemDelete
} from "../controllers/orderItemController"

const orderItemsRotas = Router()

orderItemsRotas.get('/', orderItemShow)
orderItemsRotas.get('/:id', orderItemShowUnique)
orderItemsRotas.post('/', orderItemCreate)
orderItemsRotas.put('/:id', orderItemUpdate)
orderItemsRotas.delete('/:id', orderItemDelete)

export default orderItemsRotas
