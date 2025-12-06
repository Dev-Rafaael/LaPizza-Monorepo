import { z } from "zod";

export const contatoSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  sobreNome: z.string().min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  assunto: z.string().min(3, "Assunto muito curto"),
  mensagem: z.string().min(5, "Mensagem muito curta"),
});
