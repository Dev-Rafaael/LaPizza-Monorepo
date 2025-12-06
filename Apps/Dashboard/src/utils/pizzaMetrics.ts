import type { Pizzas, Order, OrderItem,} from "@packages/types/types";

export const estoqueCritico = (pizzas: Pizzas[], limite = 5) =>
  pizzas.filter(p => p.preco <= limite);

export const maisVendidos = (orders: OrderItem[]) =>
  [...orders].sort((a, b) => b.id - a.id).slice(0, 5);

export const totalVendas = (orders: OrderItem[]) =>
  orders.reduce((acc, o) => acc + o.id, 0);
export const semVendas = (pizzas: Pizzas[], orders: Order[]) => {
  const vendidosIds = new Set(orders.map(o => o.id));
  return pizzas.filter(p => !vendidosIds.has(p.id));
};
