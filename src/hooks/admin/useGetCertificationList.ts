"use client";

import { useQuery } from "@tanstack/react-query";
import { END_POINT } from "@/constants/endPoint";
import { axiosDefault } from "@/api/axiosInstance";

export const useGetCertificationList = () => {
  return useQuery({
    queryKey: ["admin-certifications"],
    queryFn: async () => {
      try {
        const res = await axiosDefault.get(END_POINT.ADMIN_CERTIFICATION);
        
        if (Array.isArray(res.data)) {
          return res.data;
        }
        if (res.data && Array.isArray(res.data.certifications)) {
          return res.data.certifications;
        }

        console.warn("알 수 없는 응답 구조:", res.data);
        return [];
      } catch (error) {
        console.error("수료증 목록 불러오기 실패:", error);
        throw new Error("불러오기 실패");
      }
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
