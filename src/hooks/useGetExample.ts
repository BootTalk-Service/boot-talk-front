import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useQuery } from "@tanstack/react-query";

export const getExample = async () => {
  const res = await axiosDefault.get(END_POINT.EXAMPLE);

  console.log("API 응답:", res.data);

  return res.data;
};

export const useGetExample = () => {
  const { data: example } = useQuery({
    queryKey: ["example"],
    queryFn: getExample,
  });

  return { example };
};
