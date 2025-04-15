"use client";

import { useEffect, useState } from "react";
import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/user";
import type { UserStoreUser } from "@/types/user";
import { transformToAuthUser } from "@/store/authStore";

export function useUserInfo() {
  const [loading, setLoading] = useState(true);
  const { login } = useAuthStore();
  const { setUser } = useUserStore();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // 토큰은 쿠키에 담겨져 자동으로 요청
        const res = await axiosDefault.get<UserStoreUser>(END_POINT.MY_INFO);

        const user = res.data;
        setUser(user);

        // 로그인 상태 유지용
        login(transformToAuthUser(user));
      } catch (err) {
        console.error("유저 정보 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [login, setUser]);

  return { loading };
}
