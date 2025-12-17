import { create } from "zustand";
import type { Pizzas } from "@packages/types/types";

interface PizzaState {
  pizzas: Pizzas[];
  modal: boolean;
  setPizzas: (pizzas: Pizzas[]) => void;
  setModal: (value: boolean) => void;
}

export const usePizzaStore = create<PizzaState>((set) => ({
  pizzas: [],
  modal: false,
  setPizzas: (pizzas) => set({ pizzas }),
  setModal: (value) => set({ modal: value }),
}));
