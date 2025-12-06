import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Adicional } from "@packages/types/types";

interface OrderItem{
  id: number;
  sabor: string;
  descricao: string;
  preco: number;
  imagem?: string;
  precoTotal: number;
  unidades: number;
  adicionais: Adicional[];
  cartId: number;
}

interface UseOrderItem {
  OrderItem: OrderItem | null;
  addOrderItem: (item: OrderItem) => void;
}

export const UseOrderItemStore = create<UseOrderItem>()(
  persist(
    (set) => ({
      OrderItem: null,
      addOrderItem: (newOrderItem) => set({ OrderItem:newOrderItem }),
    }),
    {
      name: "orderItem-storage",
    }
  )
);
