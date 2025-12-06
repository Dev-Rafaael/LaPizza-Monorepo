import { z } from "zod";

export const cadastrarSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  sobreNome: z.string().min(3, 'Sobrenome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  cpf: z.string().min(11, 'CPF deve ter 11 caracteres').max(11),
  sexo: z.string().min(1, 'Sexo é obrigatório'),
  nascimento: z.coerce.date(),
  telefone: z.string().min(10, 'Telefone deve ter 10 ou 11 caracteres').max(11),
});
