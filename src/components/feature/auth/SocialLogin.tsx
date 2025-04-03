"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/common/AuthCard";
import Image from "next/image";

const SocialLogin = () => {
  const router = useRouter();
  const { login } = useAuthStore();

  const handleNaverLogin = async () => {
    try {
      const res = await fetch("/api/auth/naver", {
        method: "POST",
      });
  
      if (!res.ok) {
        throw new Error("네이버 로그인 실패");
      }
  
      const data = await res.json();
  
      if (!data.user || !data.token) {
        throw new Error("유저 정보 또는 토큰 누락");
      }
  
      login(data.user, data.token)
      localStorage.setItem("access_token", data.token);
      router.push("/");
    } catch (err) {
      console.error("❌ 네이버 로그인 에러:", err);
    }
  };

  return (
    <AuthCard>
      <div className="flex flex-col items-center justify-center w-full h-full gap-4">
        <Image
          src="/logo.PNG"
          alt="BootTalk Logo"
          width={300}
          height={90}
          className="object-contain mt-6 mb-10"
        />
        <p className="text-base text-center leading-relaxed">
          우리 부트톡
          <br />
          너희들의 미래를 담당하지
        </p>
        <button
          className="btn btn-success text-white text-base mt-6 min-w-[180px] min-h-[44px] mb-6"
          onClick={handleNaverLogin}
        >
          네이버로 로그인
        </button>
      </div>
    </AuthCard>
  );
};

export default SocialLogin;
