import z from "zod";

export const adicionalSchema = z.object({
  id: z.number(),
  nome: z.string(),
  preco: z.number(),
  pizzaId: z.number(),
});