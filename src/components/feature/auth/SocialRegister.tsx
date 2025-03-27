"use client";

import { useState } from "react";
import AuthCard from "@/components/common/AuthCard";

const SocialRegister = () => {
  const [job, setJob] = useState("");

  return (
    <AuthCard>
      <div className="flex flex-col items-center gap-4 w-full">
        <h1 className="text-xl font-bold mb-2">회원 정보</h1>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium text-black">
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
            <option value="frontend">프론트엔드</option>
            <option value="backend">백엔드</option>
            <option value="data">데이터</option>
            <option value="mobile">모바일</option>
            <option value="cloud">클라우드</option>
            <option value="marketing">마케팅</option>
            <option value="design">디자인</option>
          </select>
        </div>

        <div className="w-full flex justify-center">
          <label className="w-full h-28 border flex flex-col items-center justify-center cursor-pointer rounded-lg border-gray-300">
            <span className="text-sm text-gray-500">📷 프로필 이미지 추가</span>
            <input type="file" className="hidden" />
          </label>
        </div>

        <div className="w-full flex justify-end">
          <button className="btn btn-warning text-white" disabled={!job}>저장</button>
        </div>
      </div>
    </AuthCard>
  );
};

export default SocialRegister