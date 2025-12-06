import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order, User } from "../types/types";

interface Address {
  id:number;
  userId: number;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento?: string;
  user: User
  order: Order
}

interface UserAddress {
  address: Address[];
  addAddress: (address: Address) => void;
  updateAddress: (id: number, address: Partial<Address>) => void;
  deleteAddress: (id: number) => void;
  clearAddress: () => void;
}

export const useAddressStore = create<UserAddress>()(
  persist(
    (set) => ({
      address: [],

      addAddress: (item) =>
        set((state) => ({
          address: [...state.address, item],
        })),

      updateAddress: (id, updatedFields) =>
        set((state) => ({
          address: state.address.map((addr) =>
            addr.userId === id ? { ...addr, ...updatedFields } : addr
          ),
        })),

      deleteAddress: (id) =>
        set((state) => ({
          address: state.address.filter((addr) => addr.userId !== id),
        })),

      clearAddress: () => set({ address: [] }),
    }),
    {
      name: "address-storage",
    }
  )
);
