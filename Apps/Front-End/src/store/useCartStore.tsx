import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Adicional } from "@packages/types/types";


interface Cart {
  id: number;
  cartId: number;
  sabor: string;
  descricao: string;
  preco: number;
  precoTotal: number;
  unidades: number;
  adicionais: Adicional[];
  imagem?: string;
}

interface UserCart {
  items: Cart[];
  addItem: (item: Cart) => void;
updateItem: (cartId: number, newData: Partial<Cart>) => void;
  deleteItem: (id: number) => void;
  clearCart: () => void;
  getTotal: () => number; // 👈 adicionamos aqui
}

export const useUserCart = create<UserCart>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const newItem = { ...item, cartId: Date.now() };
          return { items: [...state.items, newItem] };
        }),

      updateItem: (cartId, newData) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.cartId === cartId ? { ...item, ...newData } : item
          ),
        })),

      deleteItem: (cartId) =>
        set((state) => ({
          items: state.items.filter((item) => item.cartId !== cartId),
        })),

      clearCart: () => set({ items: [] }),

   
      getTotal: () => {
        const { items } = get();
        return items.reduce((acc, item) => acc + item.precoTotal, 0);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
