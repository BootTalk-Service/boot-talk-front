import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { MentorInfoData } from "@/types/request";
import { useMutation } from "@tanstack/react-query";

const mentorApi = {
  // 멘토 기본 정보 등록 API
  registerMentorInfo: async (mentorInfo: MentorInfoData) => {
    try {
      const response = await axiosDefault.post(
        END_POINT.MENTOR_INFO,
        mentorInfo
      );
      return response.data;
    } catch (error) {
      console.error("멘토 정보 등록 오류:", error);
      throw error;
    }
  },

  registerTimeSlots: async (availableTimes: Record<string, string[]>) => {
    try {
      const response = await axiosDefault.post(END_POINT.MENTOR_TIME, {
        availableTimes,
      });
      return response.data;
    } catch (error) {
      console.error("시간 슬롯 등록 오류:", error);
      throw error;
    }
  },
};

export const useMentorRegistration = () => {
  // 멘토 기본 정보 등록 뮤테이션
  const mentorInfoMutation = useMutation({
    mutationFn: mentorApi.registerMentorInfo,
    onError: (error) => {
      console.error("멘토 정보 등록 오류:", error);
    },
  });

  // 시간 슬롯 등록 뮤테이션
  const timeSlotsMutation = useMutation({
    mutationFn: mentorApi.registerTimeSlots,
    onError: (error) => {
      console.error("시간 슬롯 등록 오류:", error);
    },
  });

  return {
    mentorInfoMutation,
    timeSlotsMutation,
    isPending: mentorInfoMutation.isPending || timeSlotsMutation.isPending,
    isError: mentorInfoMutation.isError || timeSlotsMutation.isError,
    error: mentorInfoMutation.error || timeSlotsMutation.error,
  };
};

export default useMentorRegistration;
