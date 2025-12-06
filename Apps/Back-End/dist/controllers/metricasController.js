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
exports.getMetrics = void 0;
const metricasService_1 = require("../services/metricasService");
const getMetrics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vendasHoje = yield (0, metricasService_1.getVendasHoje)();
    const vendasMes = yield (0, metricasService_1.getVendasPorMes)();
    const ticketMedio = yield (0, metricasService_1.getTicketMedio)();
    const pizzasMaisVendidas = yield (0, metricasService_1.getPizzasMaisVendidas)();
    const totalClientes = yield (0, metricasService_1.getTotalClientes)();
    const novosClientesMes = yield (0, metricasService_1.getNovosClientesMes)();
    const pedidosPorStatus = yield (0, metricasService_1.getPedidosPorStatus)();
    const vendasPorHora = yield (0, metricasService_1.getVendasPorHora)();
    const clientesNovos = yield (0, metricasService_1.getClientesNovos)();
    const clientesRecorrentes = yield (0, metricasService_1.getClientesRecorrentes)();
    const categorias = yield (0, metricasService_1.getCategorias)();
    return res.json({
        vendasHoje,
        vendasMes,
        vendasPorHora,
        ticketMedio,
        pizzasMaisVendidas,
        totalClientes,
        novosClientesMes,
        clientesNovos,
        clientesRecorrentes,
        categorias,
        pedidosPorStatus,
    });
});
exports.getMetrics = getMetrics;
