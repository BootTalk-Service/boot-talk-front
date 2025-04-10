import { NotificationItem } from "@/types/Notification";
import { END_POINT } from "@/constants/endPoint";
import { axiosDefault } from "@/api/axiosInstance";

export const fetchNotifications = async (
  page: number,
  limit: number = 10
): Promise<NotificationItem[]> => {
  try {
    const res = await axiosDefault.get(`${END_POINT.NOTIFICATIONS}?page=${page}&limit=${limit}`);
    return res.data.notificationResponseDtoList;
  } catch (error) {
    console.error("알림 데이터를 불러오지 못했습니다:", error);
    throw error;
  }
};
