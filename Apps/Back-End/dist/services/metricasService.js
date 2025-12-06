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
exports.getVendasHoje = getVendasHoje;
exports.getVendasPorMes = getVendasPorMes;
exports.getTicketMedio = getTicketMedio;
exports.getPizzasMaisVendidas = getPizzasMaisVendidas;
exports.getTotalClientes = getTotalClientes;
exports.getNovosClientesMes = getNovosClientesMes;
exports.getPedidosPorStatus = getPedidosPorStatus;
exports.getVendasPorHora = getVendasPorHora;
exports.getClientesNovos = getClientesNovos;
exports.getClientesRecorrentes = getClientesRecorrentes;
exports.getCategorias = getCategorias;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// ==========================
// 1. VENDAS HOJE
// ==========================
function getVendasHoje() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const inicioDia = new Date();
        inicioDia.setHours(0, 0, 0, 0);
        const vendas = yield prisma.order.aggregate({
            _sum: { precoTotal: true },
            where: { criadoEm: { gte: inicioDia } }
        });
        return (_a = vendas._sum.precoTotal) !== null && _a !== void 0 ? _a : 0;
    });
}
// ==========================
// 2. VENDAS POR MÊS
// ==========================
function getVendasPorMes() {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.$queryRaw `
    SELECT 
      TO_CHAR("criadoEm", 'YYYY-MM') AS mes,
      SUM("precoTotal")::float AS total
    FROM "Order"
    GROUP BY mes
    ORDER BY mes;
  `;
    });
}
// ==========================
// 3. TICKET MÉDIO
// ==========================
function getTicketMedio() {
    return __awaiter(this, void 0, void 0, function* () {
        const total = yield prisma.order.aggregate({
            _sum: { precoTotal: true }
        });
        const count = yield prisma.order.count();
        if (count === 0)
            return 0;
        return total._sum.precoTotal / count;
    });
}
// ==========================
// 4. PIZZAS MAIS VENDIDAS
// ==========================
function getPizzasMaisVendidas() {
    return __awaiter(this, void 0, void 0, function* () {
        const dados = yield prisma.orderItem.groupBy({
            by: ["pizzaId"],
            _sum: { quantidade: true },
            orderBy: { _sum: { quantidade: "desc" } }
        });
        const pizzas = yield prisma.pizza.findMany();
        return dados.map(item => {
            var _a, _b;
            return ({
                pizzaId: item.pizzaId,
                quantidade: item._sum.quantidade,
                sabor: (_b = (_a = pizzas.find(p => p.id === item.pizzaId)) === null || _a === void 0 ? void 0 : _a.sabor) !== null && _b !== void 0 ? _b : "Desconhecido"
            });
        });
    });
}
// ==========================
// 5. TOTAL DE CLIENTES
// ==========================
function getTotalClientes() {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.user.count();
    });
}
// ==========================
// 6. NOVOS CLIENTES DO MÊS
// ==========================
function getNovosClientesMes() {
    return __awaiter(this, void 0, void 0, function* () {
        const inicioMes = new Date();
        inicioMes.setDate(1);
        inicioMes.setHours(0, 0, 0, 0);
        return prisma.user.count({
            where: { criadoEm: { gte: inicioMes } }
        });
    });
}
// ==========================
// 7. PEDIDOS POR STATUS
// ==========================
function getPedidosPorStatus() {
    return __awaiter(this, void 0, void 0, function* () {
        const aberto = yield prisma.order.count({ where: { status: "aberto" } });
        const preparo = yield prisma.order.count({ where: { status: "preparo" } });
        const entregue = yield prisma.order.count({ where: { status: "entregue" } });
        return { aberto, preparo, entregue };
    });
}
function getVendasPorHora() {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.$queryRaw `
    SELECT 
      TO_CHAR("criadoEm", 'HH24') AS hora,
      SUM("precoTotal")::float AS total
    FROM "Order"
    WHERE "criadoEm" >= NOW() - INTERVAL '24 HOURS'
    GROUP BY hora
    ORDER BY hora;
  `;
    });
}
function getClientesNovos() {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.$queryRaw `
    SELECT 
      TO_CHAR("criadoEm", 'YYYY-MM-DD') AS dia,
      COUNT(*)::int AS total
    FROM "User"
    WHERE "criadoEm" >= NOW() - INTERVAL '7 DAYS'
    GROUP BY dia
    ORDER BY dia;
  `;
    });
}
function getClientesRecorrentes() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield prisma.order.groupBy({
            by: ["userId"],
            _count: { id: true },
            having: {
                id: {
                    _count: {
                        gte: 2,
                    },
                },
            },
        });
        return result.length;
    });
}
function getCategorias() {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.$queryRaw `
   SELECT 
  CASE 
    WHEN p.preco < 30 THEN 'Econômica'
    WHEN p.preco < 50 THEN 'Padrão'
    ELSE 'Premium'
  END AS categoria,
  SUM(oi.quantidade)::int AS total
FROM "OrderItem" oi
JOIN "Pizza" p ON p.id = oi."pizzaId"
GROUP BY categoria
ORDER BY total DESC;

  `;
    });
}
