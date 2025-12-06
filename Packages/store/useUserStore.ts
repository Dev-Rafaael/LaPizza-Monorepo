
  import { create } from "zustand";
  import { persist } from "zustand/middleware";

  interface User {
    id:number;
    nome: string;
    sobreNome: string;
    email: string;
    senha: string;
    cpf: string;
    sexo: string;
    nascimento: string;
    telefone: string;
    role:string;
  }

 export interface UserStore {
    user: User | null;
    token: string | null;
    createUser: (user: User) => void;
    updatedUser: (dados: Partial<User>) => void;
    login: (user: User, token: string) => void;
    logout: () => void;
  }

 export const useUserStore = create<UserStore>()(
    persist(
      (set) => ({
        user: null,
        token: null,
        createUser: (dados) => set({ user: dados }),

        updatedUser: (dados) =>
          set((state) => ({
            user: state.user ? { ...state.user, ...dados } : null,
          })),

        login: (user, token) => set({ user, token }),
        logout: () => set({ user: null, token: null }),
      }),
      {
        name: "user-storage",
      }
    )
  );


