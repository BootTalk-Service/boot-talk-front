import { useEffect } from "react";
import { useNotificationStore } from "@/store/notificationStore";

export const useNotificationEffect = () => {
  const { setNotifications } = useNotificationStore();

  
  useEffect(() => {
    const enableMockWorker = async () => {
      if (
        process.env.NEXT_PUBLIC_USE_MOCK === "true" &&
        typeof window !== "undefined"
      ) {
        const { worker } = await import("@/mocks/browser");
        worker.start();
      }
    };
    enableMockWorker();
  }, []);

  // 알림 데이터
  useEffect(() => {
    const fetchNotifications = async () => {
      if (
        process.env.NEXT_PUBLIC_USE_MOCK === "true" &&
        typeof window !== "undefined"
      ) {
        const { worker } = await import("@/mocks/browser");
        await worker.start();
      }

      try {
        const res = await fetch("/api/notifications?page=1&limit=10");
        const data = await res.json();
        setNotifications(data?.notificationResponseDtoList ?? []);
      } catch (error) {
        console.error("알림 로딩 실패:", error);
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, [setNotifications]);
};
