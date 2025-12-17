import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LocalOrder, OrderItem } from "@packages/types/types";



interface OrderStore {
  orders: LocalOrder[];
  addOrder: (order: Omit<LocalOrder, "id" | "createdAt">) => void;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],

      addOrder: (order) =>
        set((state) => ({
          orders: [
            ...state.orders,
            {
              ...order,
              id: Date.now(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: "order-storage",
    }
  )
);
