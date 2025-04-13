"use client"

import Link from "next/link";
import type { Bootcamp } from "@/types/Bootcamp";

const BootcampCard = ({
  bootcampId,
  trainingCenterName,
  bootcampName,
  bootcampRegion,
  bootcampStartDate,
  bootcampEndDate,
  bootcampCategory,
  bootcampCapacity,
  courseAverageRating,
  courseReviewCount,
}: Bootcamp) => {
  const primaryRegion = bootcampRegion.split(" ")[0];

  return (
    <Link href={`/bootcamps/${bootcampId}`}>
      <div className="grid grid-cols-6 gap-4 px-4 py-6 border-b border-slate-300 text-sm items-center hover:bg-gray-50 transition-colors">
        {/* 교육 기관명 + 교육 과정명 */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">{trainingCenterName}</span>
          <span className="font-semibold line-clamp-2 break-words text-ellipsis overflow-hidden">
            {bootcampName}
          </span>
        </div>

        {/* 학습 기간 */}
        <div>
          {bootcampStartDate} ~ {bootcampEndDate}
        </div>

        {/* 프로그램 과정 */}
        <div className="flex justify-start pl-10">
          <span className="px-2 py-1 bg-gray-100 rounded">{bootcampCategory}</span>
        </div>

        {/* 지역 */}
        <div className="flex justify-start pl-14">
          <span className="px-2 py-1 bg-gray-100 rounded">{primaryRegion}</span>
        </div>

        {/* 정원 */}
        <div className="flex justify-start pl-14">{bootcampCapacity}명</div>

        {/* 평점 및 리뷰 */}
        <div className="flex items-center gap-1 text-xs text-gray-600">
        ⭐{courseAverageRating.toFixed(1)} | {courseReviewCount}개의 리뷰
        </div>
      </div>
    </Link>
  );
};

export default BootcampCard;
