import { Router } from "express"
import {
  pizzaShow,
   pizzaSearch,
   pizzaCreate,
   pizzaUpdate,
  pizzaDelete
} from "../controllers/pizzaController"

const pizzaRotas = Router()

pizzaRotas.get('/', pizzaShow) 
pizzaRotas.get('/:sabor', pizzaSearch) 
pizzaRotas.post('/', pizzaCreate) 
pizzaRotas.put('/:id', pizzaUpdate) 
pizzaRotas.delete('/:id', pizzaDelete) 


export default pizzaRotas
