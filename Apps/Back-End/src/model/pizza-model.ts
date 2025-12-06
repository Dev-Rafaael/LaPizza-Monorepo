import { Adicional } from "./adicionais-model";

export interface Pizza {
  id: number;
  sabor: string;
  descricao:string;
  preco:number;
  imagem: string;
  adicionais: Adicional[]
}

