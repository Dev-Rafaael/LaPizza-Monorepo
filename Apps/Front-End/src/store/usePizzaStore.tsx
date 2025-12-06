import { create } from "zustand";
import type { Pizzas } from "@packages/types/types";


interface PizzaState {
  pizzas: Pizzas[];
  pizzaSelecionada: Pizzas| null;
  modal: boolean;
  setPizzas: (pizzas: Pizzas[]) => void;
  setPizzaSelecionada: (pizza: Pizzas) => void;
  setModal: (value: boolean) => void;
}

export const usePizzaStore = create<PizzaState>((set) => ({
  pizzas: [],
  pizzaSelecionada: null,
  modal: false,
  setPizzas: (pizzas) => set({ pizzas }),
  setPizzaSelecionada: (pizza) => set({ pizzaSelecionada: pizza }),
  setModal: (value) => set({ modal: value }),
}));
