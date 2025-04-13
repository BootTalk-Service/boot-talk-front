"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { Bootcamp } from "@/types/Bootcamp";

// API 응답 타입 정의
interface BootcampResponse {
  data: Bootcamp[];
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

// ✅ UI에서 선택한 값을 API 요청용 값으로 변환
const transformFilterValue = (key: string, value: string): string => {
  if (key === "duration") {
    const valueMap: Record<string, string> = {
      "4주 미만": "1",
      "4~12주": "2",
      "12주 이상": "3",
    };
    return valueMap[value] || value;
  }

  if (key === "minRating") {
    const valueMap: Record<string, string> = {
      "2점 대": "2",
      "3점 대": "3",
      "4점 대": "4",
    };
    return valueMap[value] || value;
  }

  return value;
};

// ✅ filters를 모두 변환한 버전 생성 (mock용)
const getTransformedFilters = (filters: Record<string, string>) => {
  const result: Record<string, string> = {};
  Object.entries(filters).forEach(([key, value]) => {
    result[key] = transformFilterValue(key, value);
  });
  return result;
};

const getWeeksBetween = (startDateStr: string, endDateStr: string): number => {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  const diffInMs = end.getTime() - start.getTime();
  const diffInWeeks = diffInMs / (1000 * 60 * 60 * 24 * 7);

  return Math.ceil(diffInWeeks); // 소수점 올림
};


const applyFilters = (data: Bootcamp[], filters: Record<string, string>) => {
  return data.filter((bootcamp) => {
    const { region, duration, minRating, category } = filters;

    if (region && !bootcamp.bootcampRegion.includes(region)) return false;
    if (category && bootcamp.bootcampCategory !== category) return false;

    // ⬇️ 평점 필터: 해당 점수대만 허용
    if (minRating) {
      const rating = Number(minRating);
      const nextRating = rating + 1;

      if (bootcamp.courseAverageRating < rating || bootcamp.courseAverageRating >= nextRating) {
        return false;
      }
    }

    if (duration) {
      const weeks = getWeeksBetween(
        bootcamp.bootcampStartDate,
        bootcamp.bootcampEndDate
      );

      if (duration === "1" && weeks >= 4) return false;
      if (duration === "2" && (weeks < 4 || weeks > 12)) return false;
      if (duration === "3" && weeks <= 12) return false;
    }

    return true;
  });
};


export const useGetBootcamps = (filters: Record<string, string>) => {
  const PAGE_SIZE = 10;

  const result = useInfiniteQuery<BootcampResponse>({
    queryKey: ["bootcamps", filters],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const page = pageParam as number;
      const queryParams = new URLSearchParams({
        page: page.toString(),
        size: PAGE_SIZE.toString(),
      });

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          const transformed = transformFilterValue(key, value);
          queryParams.append(key === "minRating" ? "rating" : key, transformed);
        }
      });

      const res = await axiosDefault.get(`${END_POINT.BOOTCAMPS}?${queryParams}`);
      const data = res.data?.data || [];

      const isMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";
      const transformedFilters = getTransformedFilters(filters);

      const filtered = isMock ? applyFilters(data, transformedFilters) : data;

      return {
        data: filtered,
        pagination: res.data.pagination || {
          currentPage: page,
          totalPages: Math.ceil(filtered.length / PAGE_SIZE),
        },
      };
    },
    getNextPageParam: (lastPage) => {
      const next =
        lastPage.pagination.currentPage < lastPage.pagination.totalPages
          ? lastPage.pagination.currentPage + 1
          : undefined;
      return next;
    },
  });

  return {
    bootcamps: result.data?.pages.flatMap((page) => page.data) || [],
    fetchNextPage: result.fetchNextPage,
    hasNextPage: result.hasNextPage,
    isLoading: result.isLoading,
    isError: result.isError,
  };
};
