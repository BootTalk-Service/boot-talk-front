import { create } from "zustand";
import { NotificationItem } from "@/types/Notification";

const getUnreadCount = (notifications: NotificationItem[]) =>
  notifications.filter((n) => !n.checked).length;

export interface NotificationState {
  notifications: NotificationItem[];
  unreadCount: number;
  hasMore: boolean;
  hasOpened: boolean;
  isLoading: boolean;
  page: number;

  setNotifications: (notifications: NotificationItem[]) => void;
  setHasOpened: (hasOpened: boolean) => void;
  setHasMore: (hasMore: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setPage: (page: number) => void;
  markAsReadById: (id: number) => void;
  addNotification: (item: NotificationItem) => void;
  markAllAsReadBefore: (time: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  hasMore: true,
  hasOpened: false,
  isLoading: false,
  page: 1,

  setNotifications: (notifications) =>
    set({
      notifications,
      unreadCount: getUnreadCount(notifications),
    }),

  setHasOpened: (hasOpened) =>
    set({ hasOpened }),

  setHasMore: (hasMore) =>
    set({ hasMore }),

  setIsLoading: (isLoading) =>
    set({ isLoading }),

  setPage: (page) =>
    set({ page }),

  markAsReadById: (id) =>
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.notificationId === id ? { ...n, checked: true } : n
      );
      return {
        notifications: updated,
        unreadCount: getUnreadCount(updated),
      };
    }),

    addNotification: (item) =>
      set((state) => {
        const exists = state.notifications.some(
          (n) => n.notificationId === item.notificationId
        );
    
        if (exists) return state; // 중복이면 무시
    
        const updated = [item, ...state.notifications];
        return {
          notifications: updated,
          unreadCount: getUnreadCount(updated),
        };
      }),
    

  markAllAsReadBefore: (time) =>
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.createdAt <= time ? { ...n, checked: true } : n
      );
      return {
        notifications: updated,
        unreadCount: getUnreadCount(updated),
      };
    }),
}));