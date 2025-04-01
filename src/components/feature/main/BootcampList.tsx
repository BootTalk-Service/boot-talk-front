"use client";

import { useGetBootcamps } from "@/hooks/main-page/useGetBootcamps";
import BootcampCard from "./BootcampCard";
import { Bootcamp} from "@/types/Bootcamp"

interface BootcampListProps {
  filters: { [key: string]: string };
}

const BootcampList = ({ filters }: BootcampListProps) => {
  const { bootcamps } = useGetBootcamps();

  const filtered = bootcamps?.filter((camp: Bootcamp) => {
    if (filters["지역"] && !camp.bootcamp_region.startsWith(filters["지역"])) return false;
    if (filters["직무"] && !(camp.bootcamp_category || "").includes(filters["직무"])) return false;
    if (filters["기간"]) {
      const start = new Date(camp.bootcamp_start_date);
      const end = new Date(camp.bootcamp_end_date);
    
      if (isNaN(start.getTime()) || isNaN(end.getTime())) return false;
    
      const diffWeeks = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7);

      if (filters["기간"] === "4주 미만" && diffWeeks >= 4) return false;
      if (filters["기간"] === "4~12주" && (diffWeeks < 4 || diffWeeks > 12)) return false;
      if (filters["기간"] === "12주 이상" && diffWeeks <= 12) return false;
    }
    if (filters["평점"]) {
      const rating = parseFloat(filters["평점"].split(" ")[0]);
      if (camp.bootcamp_rating < rating) return false;
    }

    return true;
  });

  return (
    <section className="px-28 py-6">
      {/* 헤더 라벨 */}
      <div className="grid grid-cols-6 gap-4 px-4 py-2 font-semibold text-sm text-gray-600 border-b border-t border-slate-300 bg-slate-50">
        <span>교육과정명</span>
        <span>학습기간</span>
        <span className="flex justify-start pl-10">프로그램 과정</span>
        <span className="flex justify-start pl-14">지역</span>
        <span className="flex justify-start pl-14">정원</span>
        <span>평점 및 리뷰</span>
      </div>
      <ul >
        {filtered?.map((camp) => (
          <BootcampCard key={camp.bootcamp_id} {...camp} />
        ))}
      </ul>
    </section>
  );
};

export default BootcampList;