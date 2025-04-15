"use client";

import Image from "next/image";
import AuthCard from "@/components/common/AuthCard";
import { toast } from "react-toastify";
import { END_POINT } from "@/constants/endPoint";

const SocialLogin = () => {

  const handleNaverLogin = () => {
    try {
      window.location.href = END_POINT.NAVER_REDIRECT;
    } catch (error) {
      console.error("소셜 로그인 오류:", error);
      toast.error("로그인 실패. 관리자에게 문의하세요.");
    }
  };

  return (
    <AuthCard>
      <div className="flex flex-col items-center justify-center w-full h-full gap-3">
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
          onClick={handleNaverLogin}
          style={{ backgroundColor: "#03C75A" }}
          className="btn text-white text-base min-w-[180px] min-h-[44px] mb-10 rounded-lg"
        >
          네이버로 로그인
        </button>
      </div>
    </AuthCard>
  );
};

export default SocialLogin;
