"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhook = exports.createPreference = void 0;
const mercadoPagoService_1 = require("../services/mercadoPagoService");
const createPreference = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, quantity, price } = req.body;
        const id = yield (0, mercadoPagoService_1.PaymentService)({
            title,
            quantity,
            price,
        });
        return res.json({ id });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao criar preferência" });
    }
});
exports.createPreference = createPreference;
const webhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("📡 Webhook Mercado Pago:", req.body);
    res.sendStatus(200);
});
exports.webhook = webhook;
