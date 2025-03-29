import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useQuery } from "@tanstack/react-query";

interface Review {
  t_user_id: number;
  bootcampId: number;
  bootcampName: string;
  rating: number;
  content: string;
  created_at: string;
}

const fetchMyReviews = async () => {
  try {
    const response = await axiosDefault.get(END_POINT.MY_REVIEWS);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch my reviews:", error);
    throw error;
  }
};

export const useGetMyReviews = () => {
  const {
    data: myReviews,
    isLoading: isMyReviewsLoading,
    isError: isMyReviewsError,
  } = useQuery<Review[]>({
    queryKey: ["myReviews"],
    queryFn: fetchMyReviews,
  });

  return { myReviews, isMyReviewsLoading, isMyReviewsError };
};
