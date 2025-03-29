import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useQuery } from "@tanstack/react-query";

const getBootcamp = async () => {
  const res = await axiosDefault.get(END_POINT.BOOTCAMPS);
  return res.data;
};

export const useGetBootcamps = () => {
  const { data: bootcamps } = useQuery({
    queryKey: ["bootcamps"],
    queryFn: getBootcamp,
  });

  return { bootcamps };
};
