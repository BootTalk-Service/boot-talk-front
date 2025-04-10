import { useMutation } from "@tanstack/react-query";
import { END_POINT } from "@/constants/endPoint";

export const usePatchNotifications = () => {
  return useMutation({
    mutationFn: async (time: string) => {
      const res = await fetch(`${END_POINT.NOTIFICATIONS}?time=${time}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        },
      });

      if (!res.ok) throw new Error("알림 읽음 처리 실패");

      return res.json();
    },
  });
};
