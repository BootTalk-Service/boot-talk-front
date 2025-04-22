"use client";

import { useState, useEffect } from "react";
import { axiosDefault } from "@/api/axiosInstance";
import AuthCard from "@/components/common/AuthCard";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/user";
import { END_POINT } from "@/constants/endPoint";
import { useGetPointsOnLogin } from "@/hooks/useGetPointOnLogin";

const SocialRegister = () => {
  const [job, setJob] = useState("");
  const [jobRoles, setJobRoles] = useState<string[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const { login } = useAuthStore();
  const { setUser } = useUserStore();
  const { refetch: refetchPoints } = useGetPointsOnLogin();

  useEffect(() => {
    const fetchJobRoles = async () => {
      try {
        const res = await axiosDefault.get(END_POINT.BOOTCAMP_JOB_ROLES);
        if (Array.isArray(res.data)) {
          setJobRoles(res.data);
        } else {
          toast.error("직무 데이터를 불러올 수 없습니다.");
        }
      } catch {
        toast.error("직무 정보를 불러오지 못했습니다.");
      }
    };
    fetchJobRoles();
  }, []);

  const handleSave = async () => {
    if (!userId || !job) {
      toast.error("필수 정보가 누락되었습니다.");
      return;
    }

    try {
      const res = await axiosDefault.get(END_POINT.MY_INFO);
      const user = res.data;

      login(
        {
          name: user.name,
          email: user.email,
          profileImage: user.profileImage,
          currentPoint: user.currentPoint,
          userId: user.userId,
        },
        ""
      );

      setUser(user);
      refetchPoints();
      toast.success("회원가입이 완료되었습니다!");
      router.replace("/");
    } catch {
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
