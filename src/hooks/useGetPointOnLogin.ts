"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";

export const useGetPointsOnLogin = () => {
  const { user, setUser } = useUserStore();

  const { data, error, refetch } = useQuery({
    queryKey: ["myPoints"],
    queryFn: async () => {
      const res = await axiosDefault.get(END_POINT.MY_POINTS);
      return res.data;
    },
    enabled: false,
  });

  useEffect(() => {
    if (data !== undefined && user) {
      setUser({
        ...user,
        currentPoint: data,
      });
    }
  }, [data, user, setUser]);

  return { data, error, refetch };
};
