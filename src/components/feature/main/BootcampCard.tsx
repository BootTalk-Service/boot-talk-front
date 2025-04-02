import Link from "next/link";
import type { Bootcamp } from "@/types/Bootcamp";
import { simplifyRegion } from "./utils/region";

const BootcampCard = ({
  bootcamp_id,
  bootcamp_name,
  training_center_name,
  bootcamp_start_date,
  bootcamp_end_date,
  bootcamp_category,
  bootcamp_region,
  bootcamp_capacity,
  bootcamp_rating,
  bootcamp_review_count,
}: Bootcamp) => {

  
  return (
    <Link href={`/bootcamps/${bootcamp_id}`}>
        <div className="grid grid-cols-6 gap-4 px-4 py-6 border-b items-center text-sm border-slate-300">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">{bootcamp_name}</span>
            <span className="font-semibold line-clamp-2 break-words text-ellipsis overflow-hidden">{training_center_name}</span>
          </div>

        {/* 학습기간 */}
        <div>{bootcamp_start_date} ~ {bootcamp_end_date}</div>

        {/* 프로그램 과정 */}
        <div className="flex justify-start pl-10">
            <span className="px-2 py-1 bg-gray-100 rounded">{bootcamp_category}</span>
          </div>

        {/* 지역 */}
        <div className="flex justify-start pl-14">
            <span className="px-2 py-1 bg-gray-100 rounded">{simplifyRegion(bootcamp_region)}</span>
          </div>

        {/* 정원 */}
        <div className="flex justify-start pl-14">{bootcamp_capacity}명</div>

        {/* 평점 및 리뷰 수 */}
        <div className="flex flex-col">
            <span className="text-xs text-gray-600 mt-1">⭐ {bootcamp_rating} | {bootcamp_review_count}개의 리뷰</span>
          </div>
        </div>
      </Link>
  );
};

export default BootcampCard;