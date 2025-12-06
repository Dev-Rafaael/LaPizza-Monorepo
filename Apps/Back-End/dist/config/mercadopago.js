"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mpClient = void 0;
const mercadopago_1 = __importDefault(require("mercadopago"));
exports.mpClient = new mercadopago_1.default({
    accessToken: process.env.MP_ACCESS_TOKEN,
});
