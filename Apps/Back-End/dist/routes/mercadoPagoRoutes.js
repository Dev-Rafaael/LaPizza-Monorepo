"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mercadoPagoController_1 = require("../controllers/mercadoPagoController");
const mercadoPagoRoutes = (0, express_1.Router)();
mercadoPagoRoutes.post('/', mercadoPagoController_1.createPreference);
mercadoPagoRoutes.post('/webhook', mercadoPagoController_1.webhook);
// "sadada"
exports.default = mercadoPagoRoutes;
