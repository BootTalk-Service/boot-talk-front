import { axiosDefault } from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { END_POINT } from "@/constants/endPoint";

export const useGetBootcampCategories = () => {
  return useQuery<string[]>({
    queryKey: ["bootcampCategories"],
    queryFn: async () => {
      try {
        const res = await axiosDefault.get<string[]>(END_POINT.BOOTCAMP_JOB_ROLES);
        console.log("직무 API 응답:", res.data);
        return res.data ?? [];
      } catch (error) {
        console.error("직무 목록 조회 실패:", error);
        return [];
      }
    },
  });
};
