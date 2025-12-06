import { Router } from "express"
import {
  contatoShow,
  contatoUniqueShow,
  contatoCreate,
  contatoUpdate,
  contatoDelete
} from "../controllers/contatoController"

const contatoRotas = Router()

contatoRotas.get("/", contatoShow)
contatoRotas.get("/:id", contatoUniqueShow)
contatoRotas.post("/", contatoCreate)
contatoRotas.put("/:id", contatoUpdate)
contatoRotas.delete("/:id", contatoDelete)

export default contatoRotas
