import type { Order } from "@packages/types/types";


export const pedidosRecentes = (orders: Order[], limite = 5) =>
  [...orders]
    .sort((a, b) => b.id - a.id)
    .slice(0, limite);


export const ticketMedio = (orders: Order[]) => {
  if (orders.length === 0) return 0;

  const total = orders.reduce((acc, o) => acc + o.precoTotal, 0);
  return total / orders.length;

}