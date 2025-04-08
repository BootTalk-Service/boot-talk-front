import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user";
import { toast } from "react-toastify";

export const useAuthGuard = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      toast.error("로그인 후 이용 부탁드립니다.", { toastId: "auth-required" });
      router.replace("/login");
    }
  }, [user, router]);

  return { user };
};
