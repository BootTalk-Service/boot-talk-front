"use client";

import { useEffect } from "react";
import { useNotificationStore } from "@/store/notificationStore";
import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";

export const useNotificationEffect = () => {
  const { setNotifications } = useNotificationStore();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axiosDefault.get(END_POINT.NOTIFICATIONS);
        const data = res.data;
        setNotifications(data?.notificationResponseDtoList ?? []);
      } catch (error) {
        console.error("알림 로딩 실패:", error);
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, [setNotifications]);
};
