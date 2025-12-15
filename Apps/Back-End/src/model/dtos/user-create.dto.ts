export interface UserCreateDTO {
  id:number;
  nome: string;
  sobreNome: string;
  email: string;
  senha: string;
  cpf: string;
  nascimento: string;
  sexo: string;
  telefone: string;
  role?: string;
}

