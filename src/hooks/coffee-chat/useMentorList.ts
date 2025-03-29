import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useQuery } from "@tanstack/react-query";

interface Mentor {
  t_user_id: number;
  user_type: string;
  name: string;
  career: string;
  introduction: string;
  coffee_chat_schedule: string[];
}

const fetchMentorList = async () => {
  try {
    const response = await axiosDefault.get(END_POINT.MENTOR_LIST, {});
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch mentor list:", error);
    throw error;
  }
};

export const useMentorList = () => {
  const {
    data: mentorList,
    isLoading,
    isError,
  } = useQuery<Mentor[]>({
    queryKey: ["mentorList"],
    queryFn: fetchMentorList,
  });

  return { mentorList, isLoading, isError };
};
