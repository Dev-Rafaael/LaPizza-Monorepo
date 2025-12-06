import { Router } from "express";
import { getMetrics } from "../controllers/metricasController";

const metricasRotas = Router();

metricasRotas.get("/", getMetrics);

export default metricasRotas;
