"use client";

import { useState, useEffect } from "react";
import { axiosDefault } from "@/api/axiosInstance";
import AuthCard from "@/components/common/AuthCard";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/user";
import { END_POINT } from "@/constants/endPoint";

const SocialRegister = () => {
  const [job, setJob] = useState("");
  const [jobRoles, setJobRoles] = useState<string[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") ?? "mock_user";

  const { login } = useAuthStore();
  const { setUser } = useUserStore();

  // 직무 목록 불러오기
  useEffect(() => {
    const fetchJobRoles = async () => {
      try {
        const res = await axiosDefault.get(END_POINT.BOOTCAMP_JOB_ROLES);
        if (Array.isArray(res.data)) {
          setJobRoles(res.data);
        } else {
          throw new Error("직무 데이터가 배열이 아닙니다.");
        }
      } catch (error) {
        console.error("직무 데이터 에러:", error);
        toast.error("직무 정보를 불러오지 못했습니다.");
      }
    };
    fetchJobRoles();
  }, []);

  // 회원가입 처리
  const handleSave = async () => {
    if (!userId || !job) {
      toast.error("필수 정보가 누락되었습니다.");
      return;
    }
  
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      const mockUser = {
        t_user_id: 1,
        name: "소셜사용자",
        email: "mock@example.com",
        profile_image: "",
        desired_career: job,
        current_point: 100,
        bootcamps: [],
      };
      const mockToken = "mock_token_1234";
      localStorage.setItem("access_token", mockToken);
      login(
        {
          id: mockUser.t_user_id,
          name: mockUser.name,
          email: mockUser.email,
          current_point: mockUser.current_point,
        },
        mockToken
      );
      setUser(mockUser);
      toast.success("Mock 회원가입 완료!");
      router.push("/");
      return;
    }
  
    try {
      // 토큰은 쿠키에서 자동 전송, 따로 추출 X
      const res = await axiosDefault.get(END_POINT.MY_INFO);
  
      const user = res.data;
  
      login(
        {
          id: user.t_user_id,
          name: user.name,
          email: user.email,
          current_point: user.current_point,
        },
        "" // 토큰은 따로 저장 X, 필요 시 쿠키에서 가져와 저장해도 무방
      );
  
      setUser(user);
      toast.success("회원가입이 완료되었습니다!");
      router.push("/");
    } catch (error) {
      console.error("회원가입 에러:", error);
      toast.error("회원가입에 실패했습니다.");
    }
  };
  

  return (
    <AuthCard>
      <div className="flex flex-col items-center gap-4 w-full">
        <h1 className="text-xl font-bold mb-2">회원 정보</h1>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium text-black mb-1">
              관심 직무<span className="text-error ml-1">*</span>
            </span>
          </label>
          <select
            className="select select-bordered w-full focus:outline-none"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          >
            <option value="" disabled hidden>
              직무를 선택하세요
            </option>
            {jobRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full flex justify-end">
          <button
            className="btn btn-warning text-white"
            disabled={!job}
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </div>
    </AuthCard>
  );
};

export default SocialRegister;
