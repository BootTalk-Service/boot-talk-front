import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useQuery } from "@tanstack/react-query";

const getBootcamp = async () => {
  const response = await axiosDefault.get(END_POINT.BOOTCAMPS);
  return response.data;
};

export const useGetBootcamps = () => {
  const { data: bootcamps } = useQuery({
    queryKey: ["bootcamps"],
    queryFn: getBootcamp,
  });

  return { bootcamps };
};
