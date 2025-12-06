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
exports.PaymentService = void 0;
const client_1 = require("@prisma/client");
const mercadopago_1 = require("../config/mercadopago");
const mercadopago_2 = require("mercadopago");
const prisma = new client_1.PrismaClient();
const PaymentService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const preference = yield new mercadopago_2.Preference(mercadopago_1.mpClient).create({
            body: {
                items: [
                    {
                        id: String(Date.now()),
                        title: data.title,
                        quantity: data.quantity,
                        unit_price: data.price,
                    },
                ],
                back_urls: {
                    success: "http://localhost:5173/success",
                    failure: "http://localhost:5173/failure",
                },
                auto_return: "approved",
            },
        });
        return preference.id;
    }
    catch (error) {
        console.error("Erro no service:", error);
        throw error;
    }
});
exports.PaymentService = PaymentService;
