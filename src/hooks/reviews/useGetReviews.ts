"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import type { Review } from "@/types/Bootcamp";

interface ReviewResponse {
  data: Review[];
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

const transformFilterValue = (key: string, value: string): string => {
  if (key === "date") {
    return value === "오래된순" ? "oldest" : "latest";
  }
  return value;
};

export const useGetReviews = (filters: Record<string, string>) => {
  const PAGE_SIZE = 20;

  return useInfiniteQuery<ReviewResponse>({
    queryKey: ["reviews", filters.category ?? "", filters.date ?? ""],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const page = pageParam as number;
      const queryParams = new URLSearchParams({
        page: page.toString(),
        size: PAGE_SIZE.toString(),
      });

      let sortValue = "latest";
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          if (key === "date") {
            sortValue = transformFilterValue(key, value);
          } else if (key === "category") {
            queryParams.append(key, value);
          }
        }
      });

      queryParams.append("sort", sortValue);

      const res = await axiosDefault.get(`${END_POINT.REVIEWS}?${queryParams}`);
      
      return {
        data: res.data?.data || [],
        pagination: res.data?.pagination || {
          currentPage: page,
          totalPages: 1,
        },
      };
    },
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};
