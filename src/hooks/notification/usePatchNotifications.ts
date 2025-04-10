import { useMutation } from "@tanstack/react-query";
import { END_POINT } from "@/constants/endPoint";
import { axiosDefault } from "@/api/axiosInstance";

export const usePatchNotifications = () => {
  return useMutation({
    mutationFn: async (time: string) => {
      try {
        const res = await axiosDefault.patch(`${END_POINT.NOTIFICATIONS}?time=${time}`);
        return res.data;
      } catch (error) {
        console.error("알림 읽음 처리 실패:", error);
        throw error;
      }
    },
  });
};
