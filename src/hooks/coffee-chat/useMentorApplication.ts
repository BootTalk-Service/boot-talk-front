import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { MentorApplicationData } from "@/types/request";
import { useMutation, useQuery } from "@tanstack/react-query";

// 가능한 시간대 정보 조회 함수
const fetchMentorApplicationTime = async (coffeeChatInfoId: string) => {
  const url = END_POINT.MENTOR_APPLICATION_TIME(coffeeChatInfoId);
  const response = await axiosDefault.get(url);
  return response.data.availableChatTimes;
};

// 커피챗 신청 함수
const submitChatRequest = async (requestData: MentorApplicationData) => {
  const response = await axiosDefault.post(
    END_POINT.SENT_COFFEE_CHATS,
    requestData
  );
  return response.data;
};

export const useMentorApplication = (coffeeChatInfoId: string) => {
  const { data: mentorApplicationTime, isLoading } = useQuery({
    queryKey: [
      "mentorApplicationTime",
      "sentList",
      "receivedList",
      coffeeChatInfoId,
    ],
    queryFn: () => fetchMentorApplicationTime(coffeeChatInfoId),
    enabled: !!coffeeChatInfoId,
  });

  const { mutate: requestCoffeeChat, isPending: isSubmitting } = useMutation({
    mutationFn: submitChatRequest,
  });

  return {
    mentorApplicationTime,
    isLoading,
    requestCoffeeChat,
    isSubmitting,
  };
};
