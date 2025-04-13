import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { MentorInfoData } from "@/types/request";
import { useMutation, useQuery } from "@tanstack/react-query";

// 멘토 정보 가져오기
const fetchMentorData = async () => {
  const response = await axiosDefault.get(END_POINT.MENTOR_REGISTER);
  return response.data;
};

// 멘토 정보 등록
const createMentorInfo = async (mentorInfo: MentorInfoData) => {
  const response = await axiosDefault.post(
    END_POINT.MENTOR_REGISTER,
    mentorInfo
  );
  return response.data;
};

// 멘토 정보 수정
const updateMentorInfo = async (mentorInfo: MentorInfoData) => {
  const response = await axiosDefault.put(
    END_POINT.MENTOR_REGISTER,
    mentorInfo
  );
  return response.data;
};

const deleteMentorInfo = async () => {
  const response = await axiosDefault.delete(END_POINT.MENTOR_REGISTER);
  return response.data;
};

export const useMentorRegistration = (options = { enabled: true }) => {
  // 멘토 정보 조회 쿼리
  const mentorDataQuery = useQuery({
    queryKey: ["mentorData"],
    queryFn: fetchMentorData,
    enabled: options.enabled, // 조건부 실행을 위한 옵션
  });

  // 멘토 기본 정보 등록 뮤테이션
  const createMentorMutation = useMutation({
    mutationFn: createMentorInfo,
    onError: (error) => {
      console.error("멘토 정보 등록 오류:", error);
    },
  });

  // 멘토 정보 수정 뮤테이션
  const updateMentorMutation = useMutation({
    mutationFn: updateMentorInfo,
    onError: (error) => {
      console.error("멘토 정보 수정 오류:", error);
    },
  });

  // 멘토 등록 삭제 뮤테이션
  const deleteMentorMutation = useMutation({
    mutationFn: deleteMentorInfo,
    onError: (error) => {
      console.error("멘토 등록 삭제 오류:", error);
    },
  });

  return {
    mentorData: mentorDataQuery.data,
    createMentorMutation,
    updateMentorMutation,
    deleteMentorMutation,
    isPending:
      createMentorMutation.isPending ||
      updateMentorMutation.isPending ||
      deleteMentorMutation.isPending,
    isCreatePending: createMentorMutation.isPending,
    isUpdatePending: updateMentorMutation.isPending,
    isDeletePending: deleteMentorMutation.isPending,
  };
};

export default useMentorRegistration;
