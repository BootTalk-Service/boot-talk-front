import { useMutation } from "@tanstack/react-query";
import { END_POINT } from "@/constants/endPoint";

export const usePatchCertificationStatus = () => {
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await fetch(
        `${END_POINT.ADMIN_CERTIFICATION}/${id}?status=${status}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("수료증 상태 변경에 실패했습니다.");
      }

      return res.json();
    },
  });
};
