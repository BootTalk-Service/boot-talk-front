import { useQuery } from "@tanstack/react-query";
import { END_POINT } from "@/constants/endPoint";
import type { ReviewPage } from "@/types/Bootcamp";
import { axiosDefault } from "@/api/axiosInstance";

export const useGetReviews = () => {
  return useQuery<ReviewPage[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      try {
        const response = await axiosDefault.get(END_POINT.REVIEWS);
        return response.data.content;
      } catch (error) {
        if (typeof error === "object" && error !== null && "response" in error) {
          const response = (error as { response?: { data?: { message?: string } } }).response;
          const message = response?.data?.message || "리뷰 데이터를 불러오는데 실패했습니다.";
          throw new Error(message);
        }
        throw new Error("알 수 없는 오류가 발생했습니다.");
      }
    },
    staleTime: 1000 * 60 * 5,
  });
};
