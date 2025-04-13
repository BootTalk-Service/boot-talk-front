"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      toast.error("로그인 후 이용 부탁드립니다.");
      router.push("/login");
    }
  }, [user, router]);

  // 비로그인 시, 아무것도 렌더링하지 않음
  if (!user) return null;

  return <>{children}</>;
};

export default RequireAuth;
