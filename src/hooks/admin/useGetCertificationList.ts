"use client";

import { useQuery } from "@tanstack/react-query";
import { END_POINT } from "@/constants/endPoint";
import { axiosDefault } from "@/api/axiosInstance";

export const useGetCertificationList = () => {
  return useQuery({
    queryKey: ["admin-certifications"],
    queryFn: async () => {
      try {
        // API 요청
        const res = await axiosDefault.get(END_POINT.ADMIN_CERTIFICATION);
        console.log("API 응답 데이터:", res.data); // 디버깅용 로그

        // 응답이 배열인 경우 (데이터가 직접 반환되는 경우)
        if (Array.isArray(res.data)) {
          return res.data;
        }

        // 응답이 certifications 속성을 가진 객체인 경우
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
    staleTime: 0, // 데이터를 항상 최신으로 유지
    refetchOnMount: true, // 컴포넌트 마운트 시 데이터를 다시 가져옴
    refetchOnWindowFocus: true, // 창 포커스 시 데이터를 다시 가져옴
  });
};
