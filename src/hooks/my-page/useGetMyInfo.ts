import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useQuery } from "@tanstack/react-query";

const fetchMyInfo = async () => {
  try {
    const response = await axiosDefault.get(END_POINT.MY_INFO, {});
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch my info:", error);
    throw error;
  }
};

export const useGetMyInfo = () => {
  const {
    data: myInfo,
    isLoading: isMyInfoLoading,
    isError: isMyInfoError,
  } = useQuery({
    queryKey: ["myInfo"],
    queryFn: fetchMyInfo,
  });

  console.log("myInfo", myInfo);

  return { myInfo, isMyInfoLoading, isMyInfoError };
};
