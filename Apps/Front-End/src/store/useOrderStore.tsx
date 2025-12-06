import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OrderItem } from "@packages/types/types";




interface Order {
  nome: string;
  sobreNome: string;
  cpf: string;
  sexo: string;
  nascimento: string;
  email: string;
  telefone: string;
  cep: string;
  estado: string;
  cidade: string;
  numero: string;
  complemento: string;
  items: OrderItem[], 
}

interface UseOrderStore {
  order: Order | null,
  addOrder: (order:Order)=> void,
}


export const UseOrderStore = create<UseOrderStore >()(
    persist(
        (set)=>({
        order:null,
        addOrder: (order) => set({order})
        }),{
            name:'order-storage'
        }
        
    )
)
