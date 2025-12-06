import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


// ==========================
// 1. VENDAS HOJE
// ==========================
export async function getVendasHoje() {
  const inicioDia = new Date();
  inicioDia.setHours(0, 0, 0, 0);

  const vendas = await prisma.order.aggregate({
    _sum: { precoTotal: true },
    where: { criadoEm: { gte: inicioDia } }
  });

  return vendas._sum.precoTotal ?? 0;
}


// ==========================
// 2. VENDAS POR MÊS
// ==========================
export async function getVendasPorMes() {
  return prisma.$queryRaw<
    { mes: string; total: number }[]
  >`
    SELECT 
      TO_CHAR("criadoEm", 'YYYY-MM') AS mes,
      SUM("precoTotal")::float AS total
    FROM "Order"
    GROUP BY mes
    ORDER BY mes;
  `;
}


// ==========================
// 3. TICKET MÉDIO
// ==========================
export async function getTicketMedio() {
  const total = await prisma.order.aggregate({
    _sum: { precoTotal: true }
  });

  const count = await prisma.order.count();

  if (count === 0) return 0;

  return total._sum.precoTotal! / count;
}


// ==========================
// 4. PIZZAS MAIS VENDIDAS
// ==========================
export async function getPizzasMaisVendidas() {
  const dados = await prisma.orderItem.groupBy({
    by: ["pizzaId"],
    _sum: { quantidade: true },
    orderBy: { _sum: { quantidade: "desc" } }
  });

  const pizzas = await prisma.pizza.findMany();

  return dados.map(item => ({
    pizzaId: item.pizzaId,
    quantidade: item._sum.quantidade,
    sabor: pizzas.find(p => p.id === item.pizzaId)?.sabor ?? "Desconhecido"
  }));
}



// ==========================
// 5. TOTAL DE CLIENTES
// ==========================
export async function getTotalClientes() {
  return prisma.user.count();
}



// ==========================
// 6. NOVOS CLIENTES DO MÊS
// ==========================
export async function getNovosClientesMes() {
  const inicioMes = new Date();
  inicioMes.setDate(1);
  inicioMes.setHours(0, 0, 0, 0);

  return prisma.user.count({
    where: { criadoEm: { gte: inicioMes } }
  });
}



// ==========================
// 7. PEDIDOS POR STATUS
// ==========================
export async function getPedidosPorStatus() {
  const aberto = await prisma.order.count({ where: { status: "aberto" } });
  const preparo = await prisma.order.count({ where: { status: "preparo" } });
  const entregue = await prisma.order.count({ where: { status: "entregue" } });

  return { aberto, preparo, entregue };
}

export async function getVendasPorHora() {
  return prisma.$queryRaw<
    { hora: string; total: number }[]
  >`
    SELECT 
      TO_CHAR("criadoEm", 'HH24') AS hora,
      SUM("precoTotal")::float AS total
    FROM "Order"
    WHERE "criadoEm" >= NOW() - INTERVAL '24 HOURS'
    GROUP BY hora
    ORDER BY hora;
  `;
}
export async function getClientesNovos() {
  return prisma.$queryRaw<
    { dia: string; total: number }[]
  >`
    SELECT 
      TO_CHAR("criadoEm", 'YYYY-MM-DD') AS dia,
      COUNT(*)::int AS total
    FROM "User"
    WHERE "criadoEm" >= NOW() - INTERVAL '7 DAYS'
    GROUP BY dia
    ORDER BY dia;
  `;
}
export async function getClientesRecorrentes() {
  const result = await prisma.order.groupBy({
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
}
export async function getCategorias() {
  return prisma.$queryRaw<
    { categoria: string; total: number }[]
  >`
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
}
