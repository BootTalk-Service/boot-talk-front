import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useQuery } from "@tanstack/react-query";
import type { Bootcamp } from "@/types/Bootcamp";

const getBootcamp = async (): Promise<Bootcamp[]> => {
  const res = await axiosDefault.get(END_POINT.BOOTCAMPS);
  if (!res.data) throw new Error("No data received"); // ✅ 에러 핸들링 추가
  return res.data;
};

export const useGetBootcamps = () => {
  const { data: bootcamps } = useQuery({
    queryKey: ["bootcamps"],
    queryFn: getBootcamp,
  });

  return { bootcamps };
};