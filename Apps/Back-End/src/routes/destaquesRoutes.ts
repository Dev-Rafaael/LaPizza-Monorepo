import { Router } from "express"
import {
  destaqueShow,
  destaqueUniqueShow,
  destaqueCreate,
  destaqueUpdate,
  destaqueDelete
} from "../controllers/destaqueController"

const destaquesRotas = Router()

destaquesRotas.get('/', destaqueShow)
destaquesRotas.get('/:id', destaqueUniqueShow)
destaquesRotas.post('/', destaqueCreate)
destaquesRotas.put('/:id', destaqueUpdate)
destaquesRotas.delete('/:id', destaqueDelete)

export default destaquesRotas
