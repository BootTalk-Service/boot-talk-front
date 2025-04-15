import { Phone, Mail, MapPin, LinkIcon } from "lucide-react";
import type { BootcampDetail } from "@/types/Bootcamp";
import DetailSectionCard from "./DetailSectionCard";

type BootcampDetailInfoProps = Pick<
  BootcampDetail,
  | "trainingCenterName"
  | "trainingCenterAddress"
  | "trainingCenterPhoneNumber"
  | "trainingCenterEmail"
  | "trainingCenterUrl"
>;

export default function BootcampDetailInfo({
  trainingCenterName,
  trainingCenterAddress,
  trainingCenterPhoneNumber,
  trainingCenterEmail,
  trainingCenterUrl,
}: BootcampDetailInfoProps) {

  const iconClass = "w-5 h-5 text-gray-600";

  return (
    <DetailSectionCard title="교육기관 정보">
      <div className="relative flex justify-between items-start">
        {/* 왼쪽 텍스트 영역 */}
        <div className="space-y-2 text-base sm:text-base text-gray-700 w-full sm:pr-0">
          {/* 모바일에선 링크, 데스크탑에선 일반 텍스트 */}
          <div className="flex items-center gap-2">
            <a
              href={trainingCenterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg sm:text-xl font-bold text-amber-950 hover:underline"
            >
              {trainingCenterName}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className={iconClass} />
            <span>{trainingCenterAddress}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className={iconClass} />
            <span>{trainingCenterPhoneNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className={iconClass} />
            <span>{trainingCenterEmail}</span>
          </div>
        </div>

        <a
          href={trainingCenterUrl}
          title={`${trainingCenterName} 홈페이지 바로가기`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:block absolute right-6 top-1/2 -translate-y-1/2"
        >
          <button className="btn btn-outline btn-base flex items-center gap-1 border-none bg-gray-100 hover:bg-gray-300 transition-colors rounded-full">
            <LinkIcon className="w-4 h-4" />
            홈페이지 바로가기
          </button>
        </a>
      </div>
    </DetailSectionCard>
  );
}
