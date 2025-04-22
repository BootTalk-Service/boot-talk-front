"use client";

import { useEffect } from "react";
import { useNotificationStore } from "@/store/notificationStore";
import { END_POINT } from "@/constants/endPoint";

export function useNotificationEffect() {
  const addNotification  = useNotificationStore((s) => s.addNotification);
  const incrementUnread  = useNotificationStore((s) => s.incrementUnread);

  useEffect(() => {
    const evtSource = new EventSource(END_POINT.SSE_CONNECT, {
      withCredentials: true,
    });

    const handleNotification = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        addNotification(data);
        incrementUnread();
      } catch (err) {
        console.error("SSE 데이터 파싱 오류:", err);
      }
    };

    evtSource.addEventListener("notification", handleNotification);
    evtSource.onmessage = handleNotification;
    evtSource.onerror = (err) => {
      console.error("SSE 연결 에러:", err);
      evtSource.close();
    };

    return () => {
      evtSource.removeEventListener("notification", handleNotification);
      evtSource.close();
    };
  }, [addNotification, incrementUnread]);
}
