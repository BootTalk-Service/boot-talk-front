import { useQuery } from "@tanstack/react-query";
import { useNotificationStore } from "@/store/notificationStore";
import { END_POINT } from "@/constants/endPoint";

export const useInitialNotifications = () => {
  const { setNotifications } = useNotificationStore();

  return useQuery({
    queryKey: ["initialNotifications"],
    queryFn: async () => {
      const res = await fetch(`${END_POINT.NOTIFICATIONS}?page=1&limit=10`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        },
      });

      const data = await res.json();
      setNotifications(data.notificationResponseDtoList);
      return data;
    },
    staleTime: 0,
    refetchOnMount: true,
  });
};
