import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";

const fetchMyInfo = async () => {
  try {
    const response = await axiosDefault.get(END_POINT.MY_INFO, {});
    return response.data;
  } catch (error) {
    console.error("Failed to fetch my info:", error);
    throw error;
  }
};

export default fetchMyInfo;
