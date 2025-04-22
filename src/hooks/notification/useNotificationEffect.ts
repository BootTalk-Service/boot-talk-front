"use client";

import { useEffect } from "react";
import { useNotificationStore } from "@/store/notificationStore";
import { END_POINT } from "@/constants/endPoint";

export function useNotificationEffect() {
  const addNotification = useNotificationStore((s) => s.addNotification);

  useEffect(() => {
    const evtSource = new EventSource(END_POINT.SSE_CONNECT, {
      withCredentials: true,
    });

    evtSource.onmessage = (e) => {
      try {
        const notification = JSON.parse(e.data);
        addNotification(notification);
      } catch (err) {
        console.error("SSE 데이터 파싱 오류:", err);
      }
    };

    evtSource.onerror = (err) => {
      console.error("SSE 연결 에러:", err);
      evtSource.close();
    };

    return () => {
      evtSource.close();
    };
  }, [addNotification]);
}
