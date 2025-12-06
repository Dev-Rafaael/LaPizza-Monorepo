import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres').max(20, 'Senha deve ter até 20 caracteres'),
});
