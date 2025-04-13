import { useQuery } from "@tanstack/react-query";
import { END_POINT } from "@/constants/endPoint";
import type { ReviewPage } from "@/types/Bootcamp";

export const useGetReviews = () => {
  return useQuery<ReviewPage[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await fetch(END_POINT.REVIEWS);
      if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.message || "리뷰 데이터를 불러오는데 실패했습니다.");
      }
      
      const data = await res.json();
      return data.content;
    },
    staleTime: 1000 * 60 * 5,
  });
};
