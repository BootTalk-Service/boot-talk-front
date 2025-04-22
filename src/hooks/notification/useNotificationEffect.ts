"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNotificationStore } from "@/store/notificationStore";
import type { NotificationItem } from "@/types/Notification";
import { getCookie } from "@/lib/\bcookie";

export const useNotificationEffect = () => {
  const { addNotification } = useNotificationStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = getCookie("Authorization");
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!token || !backendUrl) return;

    const url = `${backendUrl}api/sse-connect?token=${encodeURIComponent(
      token
    )}`;
    const es = new EventSource(url);

    const handleNotification = (e: MessageEvent) => {
      try {
        const payload: NotificationItem = JSON.parse(e.data);

        addNotification(payload);
        queryClient.setQueryData<NotificationItem[]>(
          ["notifications"],
          (old = []) => [payload, ...old]
        );
      } catch {}
    };

    es.addEventListener("notification", handleNotification);

    es.onerror = () => {};

    return () => {
      es.removeEventListener("notification", handleNotification);
      es.close();
    };
  }, [addNotification, queryClient]);
};
