import React from "react";

interface DetailSectionCardProps {
  title: string;
  children: React.ReactNode;
}

const DetailSectionCard = ({ title, children }: DetailSectionCardProps) => {
  return (
    <section className="mb-10">
      {/* 섹션 제목 */}
      <h2 className="text-xl font-bold text-amber-950 mb-2">{title}</h2>

      {/* 내용 카드 */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-md">
        <div className="p-5">{children}</div>
      </div>
    </section>
  );
};

export default DetailSectionCard;
