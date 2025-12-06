import { z } from "zod";

export const userSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  sobreNome: z.string().min(3, 'Sobrenome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(8, 'A senha deve ter entre 8 e 20 caracteres').max(20),
  cpf: z.string().min(11, 'CPF deve ter 11 caracteres').max(11),
  sexo: z.string().min(1, 'Sexo é obrigatório'),
  nascimento: z.coerce.date(),
  telefone: z.string().min(10, 'Telefone deve ter 10 ou 11 caracteres').max(11),
});
