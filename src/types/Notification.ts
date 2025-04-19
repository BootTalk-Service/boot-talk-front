import { create } from "zustand";

export interface NotificationItem { 
  notificationId: number;
  message: string;
  createdAt: string;
  type: string;
  url: string;
  checked: boolean;
}

interface NotificationState {
  notifications: NotificationItem[];
  setNotifications: (list: NotificationItem[]) => void;
  markAsReadById: (id: number) => void;
  addNotification: (item: NotificationItem) => void;
  markAllAsReadBefore: (time: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  setNotifications: (list) => set({ notifications: list }),
  markAsReadById: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.notificationId === id ? { ...n, checked: true } : n
      ),
    })),
  addNotification: (item) =>
    set((s) => ({
      notifications: [item, ...s.notifications],
    })),
  markAllAsReadBefore: (time) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.createdAt <= time ? { ...n, checked: true } : n
      ),
    })),
}));
