"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const metricasController_1 = require("../controllers/metricasController");
const metricasRotas = (0, express_1.Router)();
metricasRotas.get("/", metricasController_1.getMetrics);
exports.default = metricasRotas;
