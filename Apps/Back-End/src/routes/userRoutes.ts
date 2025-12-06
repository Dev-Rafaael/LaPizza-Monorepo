import { Router } from "express"
import {
  userCreate,
  userLogin,
  userShow,
  userShowUnique,
  userUpdate,
  userDelete
} from "../controllers/userController"

const userRotas = Router()

  userRotas.get('/', userShow)
  userRotas.get('/:id', userShowUnique)
  userRotas.post('/', userCreate)
  userRotas.post('/login', userLogin)
  userRotas.put('/:id', userUpdate)
  userRotas.delete('/:id', userDelete)

export default userRotas
