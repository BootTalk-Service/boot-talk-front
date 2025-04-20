"use client";

import { useEffect } from "react";
import { useNotificationStore } from "@/store/notificationStore";

export const useNotificationEffect = () => {
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    console.log("useNotificationEffect 실행됨");

    const token = localStorage.getItem("access_token");
    console.log("access_token:", token);

    if (!token) {
      console.warn("access_token이 없습니다. SSE 연결 생략");
      return;
    }

    const BACKEND = process.env.NEXT_PUBLIC_API_URL;
    const url = `${BACKEND}api/sse-connect?token=${token}`;

    const es = new EventSource(url);

    es.onopen = () => {
    };

    es.onmessage = (e) => {
      console.log("기본 메시지 수신:", e.data);
    };

    es.addEventListener("notification", (e) => {
      console.log("[notification] 이벤트 수신:", e.data);
      try {
        const payload = JSON.parse(e.data);
        addNotification(payload);
      } catch (err) {
        console.error("알림 JSON 파싱 실패:", err);
      }
    });

    es.onerror = (event: Event) => {
      console.error("에러 발생:", event);
      console.log(
        "event.target.readyState:",
        (event.target as EventSource).readyState
      );
    };

    return () => {
      console.log("연결 종료");
      es.close();
    };
  }, [addNotification]);
};
