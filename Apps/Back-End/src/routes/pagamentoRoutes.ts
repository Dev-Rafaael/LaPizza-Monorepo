import { Router } from "express";
import { criarCheckout } from "../controllers/pagamentoController";

 const pagamentoRotas = Router();

pagamentoRotas.post("/checkout", criarCheckout);

export default pagamentoRotas