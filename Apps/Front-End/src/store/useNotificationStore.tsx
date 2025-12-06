import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Notification {
  id: number;
  titulo: string;
  mensagem: string;
  lida: boolean;
  criadoEm: Date;
  userId: number;
}

interface UserNotification {
  notifications: Notification[];
  addNotification: (item: Notification) => void;
  updatedNotification: (id: number, item: Partial<Notification>) => void;
  deleteNotification: (id: number) => void;
  clearNotification: () => void;
}

export const useUserNotification = create<UserNotification>()(
  persist((set) => ({
    notifications: [],
    addNotification: (notification:Notification) =>
      set((state) => {
        return { notifications: [...state.notifications, notification] };
      }),
    updatedNotification: (id: number, newNotification: Partial<Notification>) =>
      set((state) => ({
          notifications: state.notifications.map((item) =>
            item.id === id ? {...item, ...newNotification} : item
          ),
      })),
    deleteNotification: (id: number) =>
      set((state) => {
        return {
          notifications: state.notifications.filter((i) => i.id !== id),
        };
      }),

    clearNotification: ()=> set({notifications: []})
  }),
{
    name: "notification-storage"
}
)
);
