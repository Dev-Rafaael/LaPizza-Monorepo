import type { User, OrderItem } from "@packages/types/types";

export const idadeMedia = (users: User[]) =>
  users.reduce((acc, u) => acc + u.id, 0) / users.length;

export const usuariosPorSexo = (users: User[]) =>
  users.reduce((acc, u) => {
    acc[u.sexo] = (acc[u.sexo] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

export const maiorComprador = (users: OrderItem[]) =>
  [...users].sort((a, b) => b.id - a.id).slice(0, 1);
export const ultimosClientes = (users: User[], limite = 5) =>
  [...users]
    .sort((a, b) => b.id - a.id)
    .slice(0, limite);