"use client";

import { useGetMyInfo } from "@/hooks/my-page/useGetMyInfo";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProfileEdit = () => {
  const { myInfo, isMyInfoLoading, isMyInfoError } = useGetMyInfo();

  if (isMyInfoLoading) return <div>로딩 중...</div>;
  if (isMyInfoError) return <div>정보를 불러오는데 실패했습니다.</div>;
  console.log("myInfo", myInfo);

  return (
    <div>
      {/* 프로필 이미지 섹션 */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-base-100 shadow-lg">
            {/* {previewUrl ? (
              <img
                src={previewUrl}
                alt="프로필 이미지"
                className="w-full h-full object-cover"
              />
            ) : ( */}
            <Image
              src="/profile-defalut.png"
              alt="프로필 이미지"
              width={150}
              height={150}
              className="object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 bg-amber-950 text-base-100 p-2 rounded-full shadow-md hover:bg-amber-900 transition-colors">
            <Pencil size={18} />
          </button>
        </div>
        <input type="file" accept="image/*" className="hidden" />
        <p className="text-sm text-gray-500 mb-6">
          클릭하여 프로필 사진을 변경해보세요
        </p>
      </div>

      {/* 관심 직무 섹션 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-base-content">
          관심 직무
        </h3>
        <div className="space-y-2">
          <select
            className="select select-bordered w-full focus:ring-2 focus:ring-neutral"
            defaultValue={myInfo.desired_Career || ""}
          >
            <option value="" disabled>
              관심 직무를 선택해주세요
            </option>
            <option value="frontend">프론트엔드 개발자</option>
            <option value="backend">백엔드 개발자</option>
            <option value="fullstack">풀스택 개발자</option>
            <option value="mobile">모바일 개발자</option>
            <option value="devops">DevOps 엔지니어</option>
            <option value="data">데이터 엔지니어</option>
          </select>
          <p className="text-xs text-gray-500">
            관심 있는 직무를 선택하시면 맞춤형 추천을 받으실 수 있습니다.
          </p>
        </div>
      </div>

      {/* 네이버 계정 정보 섹션 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3 text-base-content">
          계정 정보
        </h3>
        <div className="p-4 bg-base-200 rounded-lg border border-base-300">
          <div className="flex items-center">
            <div className="w-10 h-10 mr-4 flex-shrink-0 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <div>
              <p className="font-medium text-base-content">
                {myInfo.name || "사용자"}
              </p>
              <p className="text-sm text-gray-500">
                {myInfo.email || "이메일 정보 없음"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                네이버 계정으로 로그인됨
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 수료한 부트캠프 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3 text-base-content">
          수료한 부트캠프
        </h3>
        <div className="p-4 bg-base-200 rounded-lg border border-base-300">
          <div className="flex items-center justify-between">
            <span className="font-medium text-base-content">제로베이스</span>
          </div>
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="flex justify-end">
        <button className="btn bg-amber-950 hover:bg-amber-900 text-white">
          저장하기
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;
