import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useQuery } from "@tanstack/react-query";

interface Mentor {
  coffeeChatInfoId: number;
  userId: number;
  userName: string;
  userType: string;
  jobType: string;
  introduction: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}

const fetchMentorList = async () => {
  try {
    const response = await axiosDefault.get(END_POINT.MENTOR_LIST, {});
    return response.data;
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
