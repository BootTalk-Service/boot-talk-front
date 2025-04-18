"use client";

import { useEffect } from "react";
import { useNotificationStore } from "@/store/notificationStore";

export const useNotificationEffect = () => {
  const { addNotification } = useNotificationStore();
  const BACKEND = `${process.env.NEXT_PUBLIC_API_URL}`;

  useEffect(() => {
    const es = new EventSource(`${BACKEND}/api/sse-connect`, {
      withCredentials: true,
    });

    // 연결 성공
    es.onopen = () => {
      console.log("SSE 연결 성공!");
    };

    // 기본 메시지
    es.onmessage = (e) => {
      console.log("기본 메시지 수신:", e.data);
    };

    // 알림 이벤트
    es.addEventListener("notification", (e) => {
      console.log("[알림 이벤트] 수신됨:", e.data);
      try {
        const payload = JSON.parse(e.data);
        addNotification(payload);
      } catch (err) {
        console.error("알림 JSON 파싱 실패:", err);
      }
    });

    es.onerror = (err) => {
      console.error("SSE 에러:", err);
    };

    return () => {
      es.close();
    };
  }, [addNotification]);
};
