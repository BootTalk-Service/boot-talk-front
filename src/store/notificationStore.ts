import { create } from "zustand";
import { NotificationItem } from "@/types/Notification";

interface NotificationState {
  notifications: NotificationItem[];
  unreadCount: number;
  hasMore: boolean;
  hasOpened: boolean;
  isLoading: boolean;
  page: number;

  setNotifications: (notifications: NotificationItem[]) => void;
  loadNextPage: () => void;
  setHasOpened: (hasOpened: boolean) => void;
  updateCheckedNotifications: (time: string) => void;
  markAsReadById: (id: number) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  hasMore: true,
  hasOpened: false,
  isLoading: false,
  page: 1,

  setNotifications: (notifications) => {
    if (!Array.isArray(notifications)) return;
    const unread = notifications.filter((n) => !n.checked).length;
    set({ notifications, unreadCount: unread });
  },

  loadNextPage: async () => {
    const { page, notifications } = get();

    set({ isLoading: true });

    const res = await fetch(`/api/notifications?page=${page}&limit=10`);
    const data = await res.json();

    const nextList = data?.notificationResponseDtoList ?? [];
    const merged = [...notifications, ...nextList];
    const unique = Array.from(
      new Map(merged.map((n) => [n.notificationId, n])).values()
    );

    set({
      notifications: unique,
      unreadCount: data.uncheckedCount ?? 0,
      hasMore: nextList.length > 0,
      page: page + 1,
      isLoading: false,
    });
  },

  setHasOpened: (hasOpened) => set({ hasOpened }),

  updateCheckedNotifications: (time) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        new Date(n.createdAt) <= new Date(time)
          ? { ...n, checked: true }
          : n
      ),
      unreadCount: state.notifications.filter(
        (n) => new Date(n.createdAt) > new Date(time) && !n.checked
      ).length,
    }));
  },

  markAsReadById: (id) => {
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.notificationId === id ? { ...n, checked: true } : n
      );
      const unread = updated.filter((n) => !n.checked).length;

      return { notifications: updated, unreadCount: unread };
    });
  },
}));
