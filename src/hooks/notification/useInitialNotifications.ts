import { useQuery } from "@tanstack/react-query";
import { useNotificationStore } from "@/store/notificationStore";
import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";

export const useInitialNotifications = () => {
  const { setNotifications } = useNotificationStore();

  return useQuery({
    queryKey: ["initialNotifications"],
    queryFn: async () => {
      try {
        const res = await axiosDefault.get(`${END_POINT.NOTIFICATIONS}?page=1&limit=10`);
        const data = res.data;
        setNotifications(data.notificationResponseDtoList);
        return data;
      } catch (error) {
        console.error("알림 로딩 실패:", error);
        setNotifications([]);
        throw error;
      }
    },
    staleTime: 0,
    refetchOnMount: true,
  });
};
