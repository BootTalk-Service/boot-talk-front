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
        <h1 className="text-3xl font-bold text-amber-950 truncate">{data.training_center_name}</h1>
        <div className="border-t border-amber-600 mt-4" />
      </div>

      {/* 상세 정보 카드 */}
      <BootcampDetailInfo
        bootcamp_name={data.bootcamp_name}
        training_center_address={data.training_center_address}
        training_center_phone_number={data.training_center_phone_number}
        training_center_email={data.training_center_email}
        training_center_url={data.training_center_url}
      />

      <BootcampSchedule
        bootcamp_start_date={data.bootcamp_start_date}
        bootcamp_end_date={data.bootcamp_end_date}
        bootcamp_capacity={data.bootcamp_capacity}
        bootcamp_degree={data.bootcamp_degree}
        bootcamp_cost={data.bootcamp_cost}
      />

      <BootcampIntro />

      <BootcampReview reviews={data.reviews} />
    </main>
    </>
  );
};

export default BootcampDetailClient;