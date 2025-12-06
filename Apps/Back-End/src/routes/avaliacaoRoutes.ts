import { Router } from "express"
import {
  avaliacaoShow,
  avaliacaoUniqueShow,
  avaliacaoCreate,
  avaliacaoUpdate,
  avaliacaoDelete
} from "../controllers/avaliacaoController"

const avaliacaoRotas = Router()

avaliacaoRotas.get('/', avaliacaoShow)
avaliacaoRotas.get('/:id', avaliacaoUniqueShow)
avaliacaoRotas.post('/', avaliacaoCreate)
avaliacaoRotas.put('/:id', avaliacaoUpdate)
avaliacaoRotas.delete('/:id', avaliacaoDelete)

export default avaliacaoRotas
