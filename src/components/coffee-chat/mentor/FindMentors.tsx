import React, { useState } from "react";
import MentorProfileModal from "./MentorProfileModal";
import { useMentorList } from "@/hooks/coffee-chat/useMentorList";
import { Mentor } from "@/types/response";

const FindMentors = () => {
  const { mentorList, isLoading, isError } = useMentorList();
  console.log("멘토 리스트:", mentorList);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  const handleMentorClick = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <>
      <div className="mt-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
          <h3 className="text-lg font-semibold">멘토 리스트</h3>
          <div className="flex flex-warp gap-2">
            {/* 기타 옵션은 필요 시 추가 예정 */}
            <select defaultValue="all" className="select">
              <option value="all">모든 분야</option>
              <option value="프론트엔드">프론트엔드</option>
              <option value="백엔드">백엔드</option>
              <option value="디자인">디자인</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mentorList?.map((mentor) => (
            <div
              key={mentor.userId}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow h-full flex flex-col"
            >
              <div className="flex justify-between">
                <h4 className="font-semibold text-lg">{mentor.userName}</h4>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    mentor.userType === "현업자"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-gray-50 text-gray-700"
                  }`}
                >
                  {mentor.userType}
                </span>
              </div>

              <div className="my-3">
                <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded">
                  {mentor.jobType}
                </span>
              </div>

              <div className="space-y-2 mt-2 text-sm text-gray-600 flex-grow">
                <p className="flex justify-between">
                  <span>커피챗 비용:</span>
                  <span className="font-medium text-gray-800">
                    {mentor.userType === "현업자" ? 3 : 1} 포인트
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>가능 날짜:</span>
                  <span className="font-medium text-gray-800">3일 가능</span>
                </p>
              </div>

              <div className="flex space-x-2 mt-4">
                <button
                  className="flex-1 py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm font-medium transition-colors"
                  onClick={() => handleMentorClick(mentor)}
                >
                  프로필 보기
                </button>
                <button className="flex-1 py-2 px-3 bg-amber-900 hover:bg-amber-950 text-white rounded text-sm font-medium transition-colors">
                  신청하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 프로필 상세보기 모달 */}
      <MentorProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        mentorProfile={selectedMentor}
      />
    </>
  );
};

export default FindMentors;
