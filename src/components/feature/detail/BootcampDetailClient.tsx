"use client";

import { useGetBootcampDetail } from "@/hooks/detail/useGetBootcampDetail";
import BootcampDetailInfo from "@/components/feature/detail/BootcampDetailInfo";
import BootcampSchedule from "@/components/feature/detail/BootcampSchedule";
import BootcampReview from "@/components/feature/detail/BootcampReview";
import BootcampIntro from "./BootcampIntro";

interface Props {
  id: string;
}

const BootcampDetailClient = ({ id }: Props) => {
  const { data, isLoading, isError } = useGetBootcampDetail(id);

  if (isLoading) return <p className="p-10 text-center text-gray-500">불러오는 중...</p>;
  if (isError || !data) return <p className="p-10 text-center text-gray-500">데이터를 불러오지 못했습니다.</p>;

  return (
    <>
    <main className="max-w-screen-xl min-w-[320px] mx-auto px-6 py-10">
      {/* 제목 영역 */}
      <div className="mb-8 mt-6 overflow-hidden">
        <h1 className="text-2xl font-bold text-amber-950 break-words">
          <span className="block sm:hidden line-clamp-2 text-balance">
            {data.bootcampName}
          </span>
          <span className="hidden sm:inline truncate">{data.bootcampName}</span>
        </h1>
        <div className="border-t border-amber-600 mt-4" />
      </div>

      {/* 상세 정보 카드 */}
      <BootcampDetailInfo
        trainingCenterName={data.trainingCenterName}
        trainingCenterAddress={data.trainingCenterAddress}
        trainingCenterPhoneNumber={data.trainingCenterPhoneNumber || "-"}
        trainingCenterEmail={data.trainingCenterEmail  || "-"}
        trainingCenterUrl={data.trainingCenterUrl}
      />

      <BootcampSchedule
        bootcampStartDate={data.bootcampStartDate}
        bootcampEndDate={data.bootcampEndDate}
        bootcampCapacity={data.bootcampCapacity}
        bootcampDegree={data.bootcampDegree}
        bootcampCost={data.bootcampCost}
      />

      <BootcampIntro />

      <BootcampReview reviews={data.reviews} />
    </main>
    </>
  );
};

export default BootcampDetailClient;