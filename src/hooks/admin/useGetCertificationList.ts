import { useQuery } from "@tanstack/react-query";
import { END_POINT } from "@/constants/endPoint";

export const useGetCertificationList = () => {
  return useQuery({
    queryKey: ["admin-certifications"],
    queryFn: async () => {
      const res = await fetch(END_POINT.ADMIN_CERTIFICATION);
      if (!res.ok) throw new Error("불러오기 실패");

      const data = await res.json();

      if (Array.isArray(data)) {
        return data;
      }

      if (Array.isArray(data.certifications)) {
        return data.certifications;
      }

      return [];
    },
    staleTime: 0,
    refetchOnMount: false,
  });
};
