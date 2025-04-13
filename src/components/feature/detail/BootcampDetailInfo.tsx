import { Phone, Mail, MapPin, LinkIcon } from "lucide-react";
import type { BootcampDetail } from "@/types/Bootcamp";
import DetailSectionCard from "./DetailSectionCard";

type BootcampDetailInfoProps = Pick<
  BootcampDetail,
  | "bootcamp_name"
  | "training_center_address"
  | "training_center_phone_number"
  | "training_center_email"
  | "training_center_url"
>;

export default function BootcampDetailInfo({
  bootcamp_name,
  training_center_address,
  training_center_phone_number,
  training_center_email,
  training_center_url,
}: BootcampDetailInfoProps) {

  const iconClass = "w-5 h-5 text-amber-900";

  return (
    <DetailSectionCard title="교육기관 정보">
      <div className="relative flex justify-between items-start">
        {/* 왼쪽 텍스트 영역 */}
        <div className="space-y-2 text-base text-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-amber-950 flex items-center">{bootcamp_name}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className={iconClass} />
            <span>{training_center_address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className={iconClass} />
            <span>{training_center_phone_number}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className={iconClass} />
            <span>{training_center_email}</span>
          </div>
        </div>

        <a
          href={training_center_url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-6 top-1/2 -translate-y-1/2"
        >
          <button className="btn btn-outline btn-base flex items-center gap-1 border-none bg-amber-200 text-amber-950 hover:bg-warning  hover:text-white transition-colors rounded-full">
            <LinkIcon className="w-4 h-4" />
            홈페이지 바로 가기
          </button>
        </a>
      </div>
    </DetailSectionCard>
  );
}
