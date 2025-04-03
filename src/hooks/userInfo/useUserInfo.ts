'use client';

import { useQuery } from "@tanstack/react-query";
import { END_POINT } from "@/constants/endPoint";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

const fetchUserInfo = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("로그인이 필요합니다.");

  const res = await fetch(END_POINT.MY_INFO, {
    headers: { Authorization: `Bearer ${token}`},
  });

  if (!res.ok) throw new Error("로그인되어 있지 않습니다.");
  return res.json();
};

export const useUserInfo = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    retry: false,
    enabled: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") refetch();
  }, [refetch]);

  useEffect(() => {
    if (data) setUser(data)}, [data, setUser]);

  useEffect(() => {
    if (error) setUser(null)}, [error, setUser]);

  return {
    user, isLoading, error,
  };
};
