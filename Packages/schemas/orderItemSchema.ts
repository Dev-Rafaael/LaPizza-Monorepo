import z from 'zod'


export const orderItemSchema = z.object({
  pizzaId: z.number(),
  quantidade: z.number().min(1, "Precisa ter pelo menos 1 unidade"),
  adicionais: z.array(z.string()).default([]),
  subtotal: z.number().min(0.1, "Subtotal deve ser maior que 0"),
});
