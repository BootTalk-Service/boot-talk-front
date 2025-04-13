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
  | "bootcamp_start_date"
  | "bootcamp_end_date"
  | "bootcamp_capacity"
  | "bootcamp_degree"
  | "bootcamp_cost"
>;

export default function BootcampSchedule({
  bootcamp_start_date,
  bootcamp_end_date,
  bootcamp_capacity,
  bootcamp_degree,
  bootcamp_cost,
}: BootcampScheduleProps) {

  const iconClass = "w-5 h-5 text-amber-900";
  const textClass = "text-base text-amber-950 font-bold"

  return (
    <DetailSectionCard title="일정 & 훈련 정보">
      <div className="space-y-4 text-base text-gray-700">
        <div className="flex items-center gap-3">
          <CalendarDays className={iconClass} />
          <span className={textClass}>훈련 기간:</span>
          <span>{bootcamp_start_date} ~ {bootcamp_end_date}</span>
        </div>

        <div className="flex items-center gap-2">
          <Users className={iconClass} />
          <span className={textClass}>총 정원:</span>
          <span>{bootcamp_capacity}명</span>
        </div>

        <div className="flex items-center gap-2">
          <Repeat className={iconClass} />
          <span className={textClass}>개설 회차:</span> 
          <span>{bootcamp_degree}회차</span>
        </div>

        <div className="flex items-center gap-2">
          <DollarSign className={iconClass} />
          <span className={textClass}>교육비:</span>
          <span>{bootcamp_cost ? "유료" : "무료"}</span>
        </div>
      </div>
    </DetailSectionCard>
  );
}