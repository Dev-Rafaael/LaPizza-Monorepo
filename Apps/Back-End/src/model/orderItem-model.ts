import { Adicional } from "./adicionais-model";

export interface OrderItem {
    id: number;
  orderId: number;
  pizzaId: number;
  sabor: string;
  descricao?: string;
  imagem?: string;
  precoUnitario: number;
  quantidade: number;
  precoTotal: number;
  adicionais: Adicional[];
}




