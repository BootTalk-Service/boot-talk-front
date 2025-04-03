import { toast } from "react-hot-toast";
import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileFormData } from "@/types/request";

const fetchProfile = async (data: ProfileFormData) => {
  const response = await axiosDefault.put(END_POINT.MY_INFO, data);
  return response.data;
};

export const usePutProfile = () => {
  const queryClient = useQueryClient();
  const {
    mutate: submitProfile,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationKey: ["profile"],
    mutationFn: fetchProfile,
    onSuccess: (data) => {
      console.log("프로필 수정 성공", data);
      queryClient.setQueryData(["myInfo"], data);
      toast.success("프로필이 성공적으로 등록되었습니다.");
    },
    onError: (error) => {
      console.log("프로필 수정 실패:", error);
      toast.error("프로필 수정에 실패하였습니다.");
    },
  });

  return {
    submitProfile,
    isPending,
    isSuccess,
    isError,
  };
};
