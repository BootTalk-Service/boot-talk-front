"use client";

import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/user";
import { transformToAuthUser } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";

export function useUserInfo() {
  const { login } = useAuthStore();
  const { setUser } = useUserStore();

  const { data, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const res = await axiosDefault.get(END_POINT.MY_INFO);
      const user = res.data;
      setUser(user);
      login(transformToAuthUser(user));
      return user;
    },
    // 캐싱 설정
    staleTime: 5 * 60 * 1000, // 5분
  });

  return { userInfo: data, isLoading };
}
