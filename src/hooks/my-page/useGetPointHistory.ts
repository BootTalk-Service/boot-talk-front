import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useQuery } from "@tanstack/react-query";

interface Point {
  point_id: string | number;
  event_type: string;
  created_at: string;
  type: "EARN" | "USE";
  changed_points: number;
  current_points: number;
}

const fetchPointHistory = async () => {
  try {
    const response = await axiosDefault.get(END_POINT.POINT_HISTORY);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch my point's history:", error);
    throw error;
  }
};

export const useGetPointHistory = () => {
  const {
    data: pointHistory,
    isLoading: isPointHistoryLoading,
    isError: isPointHistoryError,
  } = useQuery<Point[]>({
    queryKey: ["pointHistory"],
    queryFn: fetchPointHistory,
  });

  return { pointHistory, isPointHistoryLoading, isPointHistoryError };
};
