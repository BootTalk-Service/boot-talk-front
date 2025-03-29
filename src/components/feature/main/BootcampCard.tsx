import Link from "next/link";
import { BootcampCardProps } from "@/types/BootcampCard";

const BootcampCard = ({
  id,
  name,
  tcname,
  bt_startDate,
  bt_endDate,
  capacity,
  region,
  bt_rating,
  bt_reviewCount,
  Category,
}: BootcampCardProps) => {
  
  return (
    <Link href={`/bootcamps/${id}`}>
      <li className="grid grid-cols-6 gap-4 px-4 py-6 border-b items-center text-sm border-slate-300 hover:bg-neutral-100 cursor-pointer transition-colors duration-150">
        {/* 부트캠프명 */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">{tcname}</span>
          <span className="font-semibold">{name}</span>
        </div>

        {/* 학습기간 */}
        <div>
          <span>
            {bt_startDate} ~ {bt_endDate}
          </span>
        </div>

        {/* 기술 스택 */}
        <div className="flex justify-start pl-6">
          <span className="px-2 py-1 bg-gray-100 rounded">{Category}</span>
        </div>

        {/* 지역 */}
        <div>{region}</div>

        {/* 정원 */}
        <div className="flex justify-start pl-14">{capacity}명</div>

        <div className="flex flex-col">
        {/* 평점 및 리뷰 수 */}
        <span className="text-xs text-gray-600 mt-1">
      ⭐ {bt_rating} | {bt_reviewCount}개의 리뷰
        </span> 
      </div>

      </li>
    </Link>
  );
};

export default BootcampCard;
