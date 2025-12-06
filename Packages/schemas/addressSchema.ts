import { z } from "zod";

export const addressSchema = z.object({
  cep: z.string().min(8, "CEP deve ter 8 dígitos"),
  estado: z.string().min(2, "Estado deve ter pelo menos 2 caracteres"),
  cidade: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres"),
  bairro: z.string().min(2, "Bairro deve ter pelo menos 2 caracteres"),
  rua: z.string().min(2, "Rua deve ter pelo menos 2 caracteres"),
  numero: z.string().min(1, "Número é obrigatório"),
  complemento: z.string().optional(),
});
