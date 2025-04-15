"use client";

import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { useGetMyInfo } from "@/hooks/my-page/useGetMyInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormSelect from "../../common/select/FormSelect";
import ProfileImageUpload from "./ProfileImageUpload";
import { ProfileFormData } from "@/types/request";

const CAREER_OPTIONS = [
  { value: "APPLICATION_SW_ENGINEERING", label: "응용SW엔지니어링" },
  { value: "SMART_EQUIPMENT_DESIGN", label: "백엔드 개발자" },
  {
    value: "INFORMATION_SECURITY_MANAGEMENT",
    label: "정보보호관리·운영",
  },
  { value: "SW_PRODUCT_PLANNING", label: "SW제품기획" },
  { value: "BIGDATA_ANALYSIS", label: "빅데이터분석" },
  { value: "AI_SERVICE_IMPLEMENTATION", label: "인공지능서비스구현" },
  { value: "UI_UX_ENGINEERING", label: "UI/UX엔지니어링" },
  { value: "SECURITY_ENGINEERING", label: "보안엔지니어링" },
  { value: "ELECTRONIC_HARDWARE_DEV", label: "전자응용기기하드웨어개발" },
  { value: "DIGITAL_BIZ_SUPPORT_SERVICE", label: "디지털비즈니스지원서비스" },
  { value: "SEMICONDUCTOR_DEV", label: "반도체개발" },
  {
    value: "CLOUD_INFRA_ENGINEERING",
    label: "클라우드인프라스트럭쳐엔지니어링",
  },
  { value: "BIGDATA_PLATFORM_DEV", label: "빅데이터플랫폼구축" },
  { value: "DB_ENGINEERING", label: "DB엔지니어링" },
  { value: "CLOUD_SOLUTION_ARCH", label: "클라우드솔루션아키텍처" },
  { value: "IOT_SYSTEM_INTEGRATION", label: "IoT시스템연동" },
];

const ProfileEdit = () => {
  const { myInfo, isMyInfoLoading, isMyInfoError } = useGetMyInfo();
  const queryClient = useQueryClient();
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const { handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      name: "",
      desired_career: "",
    },
  });

  useEffect(() => {
    if (myInfo) {
      setValue("name", myInfo.name);
      setValue("desired_career", myInfo.desired_career);
    }
  }, [myInfo, setValue]);

  const updateProfileMutation = useMutation({
    mutationFn: async (formData: ProfileFormData) => {
      const response = await axiosDefault.put(END_POINT.MY_INFO, formData);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("서버 응답 데이터:", data);

      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
      toast.success("프로필이 성공적으로 업데이트되었습니다.");
    },
    onError: (error) => {
      console.error("프로필 업데이트 중 오류 발생:", error);
      toast.error("프로필 업데이트에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate({
      ...data,
      profile_image: profileImageUrl,
    });
  };

  if (isMyInfoLoading) return <div>로딩 중...</div>;
  if (isMyInfoError) return <div>정보를 불러오는데 실패했습니다.</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 프로필 이미지 섹션 */}
      <ProfileImageUpload
        setImage={setProfileImageUrl}
        initialImageUrl={profileImageUrl}
      />

      {/* 관심 직무 섹션 */}
      <div className="mb-6">
        <h3 className="mb-3 font-semibold text-base-content">관심 직무</h3>
        <FormSelect
          options={CAREER_OPTIONS}
          value={watch("desired_career")}
          onChange={(value) => setValue("desired_career", value)}
          placeholder="관심 직무를 선택해주세요"
          className="select-bordered w-full focus:ring-2 focus:ring-neutral"
          helpText="관심 있는 직무를 선택하시면 맞춤형 추천을 받으실 수 있습니다."
        />
      </div>

      {/* 네이버 계정 정보 섹션 */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3 text-base-content">계정 정보</h3>
        <div className="p-4 bg-base-200 rounded-md border border-base-300">
          <div className="flex items-center">
            <div>
              <p className="text-sm text-base-content">{myInfo?.name}</p>
              <p className="text-sm text-gray-500">{myInfo?.email}</p>
              <p className="text-xs text-gray-400 mt-1">
                네이버 계정으로 로그인됨
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 수료한 부트캠프 */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3 text-base-content">
          수료한 부트캠프
        </h3>
        <div className="p-4 bg-base-200 rounded-md border border-base-300">
          <div className="flex items-center justify-between text-sm">
            <span>제로베이스</span>
          </div>
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn bg-amber-900 hover:bg-amber-950 text-white"
          disabled={updateProfileMutation.isPending}
        >
          {updateProfileMutation.isPending ? "저장 중..." : "저장"}
        </button>
      </div>
    </form>
  );
};

export default ProfileEdit;
