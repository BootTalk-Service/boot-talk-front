"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import AuthCard from "@/components/common/AuthCard";
import { DB } from "@/mocks/db/db";
import { transformUser } from "@/mocks/db/transformUser";
import { useUserStore } from "@/store/user";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";

const SocialLogin = () => {
  const router = useRouter();
  const { login } = useAuthStore();
  const { setUser } = useUserStore();

  const handleNaverLogin = () => {
    const mockUserFromDB = DB.myInfo;
    const user = transformUser(mockUserFromDB);

    setUser(user);
    login(user, "mock_token");
    toast.success("로그인 성공! 환영합니다.");
    router.push("/");
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
          style={{ backgroundColor: "#03C75A" }}
          className="btn text-white text-base min-w-[180px] min-h-[44px] mb-10 rounded-lg"
          onClick={handleNaverLogin}
        >
          네이버로 로그인
        </button>
      </div>
    </AuthCard>
  );
};

export default SocialLogin;
