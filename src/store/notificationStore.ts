import { create } from "zustand";
import { NotificationItem } from "@/types/Notification";
import { axiosDefault } from "@/api/axiosInstance";

const getUnreadCount = (notifications: NotificationItem[]) =>
  notifications.filter((n) => !n.checked).length;

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
    if (!Array.isArray(notifications)) {
      console.warn("Invalid notification data:", notifications);
      return;
    }
    set({
      notifications,
      unreadCount: getUnreadCount(notifications),
    });
  },

  loadNextPage: async () => {
    const { page, notifications } = get();

    set({ isLoading: true });

    try {
      const response = await axiosDefault.get(`/api/notifications`, {
        params: { page, limit: 10 }
      });
      const data = response.data;

      const nextList = data?.notificationResponseDtoList ?? [];
      const merged = [...notifications, ...nextList];
      const unique = Array.from(
        new Map(merged.map((n) => [n.notificationId, n])).values()
      );

      set({
        notifications: unique,
        unreadCount: data.uncheckedCount ?? getUnreadCount(unique),
        hasMore: nextList.length > 0,
        page: page + 1,
        isLoading: false,
      });
    } catch (error) {
      console.error("알림 목록 불러오기 실패:", error);
      set({ isLoading: false });
    }
  },

  setHasOpened: (hasOpened) => set({ hasOpened }),

  updateCheckedNotifications: (time) => {
    set((state) => {
      const updated = state.notifications.map((n) =>
        new Date(n.createdAt) <= new Date(time)
          ? { ...n, checked: true }
          : n
      );
      return {
        notifications: updated,
        unreadCount: getUnreadCount(updated),
      };
    });
  },

  markAsReadById: (id) => {
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.notificationId === id ? { ...n, checked: true } : n
      );
      return {
        notifications: updated,
        unreadCount: getUnreadCount(updated),
      };
    });
  },
}));