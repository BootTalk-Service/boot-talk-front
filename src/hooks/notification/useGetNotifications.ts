import { NotificationItem } from "@/types/Notification";
import { END_POINT } from "@/constants/endPoint";

export const fetchNotifications = async (
  page: number,
  limit: number = 10
): Promise<NotificationItem[]> => {
  const res = await fetch(
    `${END_POINT.NOTIFICATIONS}?page=${page}&limit=${limit}`,
    {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
    }
  );

  if (!res.ok) throw new Error("알림 데이터를 불러오지 못했습니다");

  const data = await res.json();
  return data.notificationResponseDtoList;
};