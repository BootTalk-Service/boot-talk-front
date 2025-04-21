"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNotificationStore } from "@/store/notificationStore";
import type { NotificationItem } from "@/types/Notification";

export const useNotificationEffect = () => {
  const { addNotification } = useNotificationStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const BACKEND = process.env.NEXT_PUBLIC_API_URL;
    const url = `${BACKEND}api/sse-connect?token=${token}`;

    const es = new EventSource(url);

    es.addEventListener("notification", (e) => {
      try {
        const payload: NotificationItem = JSON.parse(e.data);
        addNotification(payload);

        queryClient.setQueryData<NotificationItem[]>(
          ["notifications"],
          (old = []) => [payload, ...old]
        );
      } catch (err) {
        console.error("알림 JSON 파싱 실패:", err);
      }
    });

    es.onerror = (err) => {
      console.error("SSE 에러 발생:", err);
    };

    return () => {
      es.close();
    };
  }, [addNotification, queryClient]);
};
