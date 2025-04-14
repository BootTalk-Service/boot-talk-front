import {
  CalendarDays,
  Users,
  Repeat,
  DollarSign,
} from "lucide-react";
import type { BootcampDetail } from "@/types/Bootcamp";
import DetailSectionCard from "./DetailSectionCard";

type BootcampScheduleProps = Pick<
  BootcampDetail,
  | "bootcampStartDate"
  | "bootcampEndDate"
  | "bootcampCapacity"
  | "bootcampDegree"
  | "bootcampCost"
>;

export default function BootcampSchedule({
  bootcampStartDate,
  bootcampEndDate,
  bootcampCapacity,
  bootcampDegree,
  bootcampCost,
}: BootcampScheduleProps) {

  const iconClass = "w-5 h-5 text-gray-700";
  const textClass = "text-base text-gray-700 font-bold"

  return (
    <DetailSectionCard title="일정 & 훈련 정보">
      <div className="space-y-4 text-base text-gray-700">
        <div className="flex items-center gap-3">
          <CalendarDays className={iconClass} />
          <span className={textClass}>훈련 기간:</span>
          <span>{bootcampStartDate} ~ {bootcampEndDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <Users className={iconClass} />
          <span className={textClass}>총 정원:</span>
          <span>{bootcampCapacity}명</span>
        </div>

        <div className="flex items-center gap-2">
          <Repeat className={iconClass} />
          <span className={textClass}>개설 회차:</span> 
          <span>{bootcampDegree}회차</span>
        </div>

        <div className="flex items-center gap-2">
          <DollarSign className={iconClass} />
          <span className={textClass}>교육비:</span>
          <span>{bootcampCost ? "유료" : "무료"}</span>
        </div>
      </div>
    </DetailSectionCard>
  );
}