import { useMentorList } from "@/hooks/coffee-chat/useMentorList";
import React from "react";

const FindMentors = () => {
  const { mentorList, isLoading, isError } = useMentorList();
  console.log("멘토 리스트:", mentorList);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">멘토 리스트</h3>
        <div className="flex space-x-2">
          <select className="text-sm border rounded px-2 py-1">
            <option>최신순</option>
            <option>평점순</option>
          </select>
          <select className="text-sm border rounded px-2 py-1">
            <option>모든 분야</option>
            <option>프론트엔드</option>
            <option>백엔드</option>
            <option>디자인</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mentorList?.map((mentor) => (
          <div
            key={mentor.t_user_id}
            className="p-4 bg-white rounded shadow hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between">
              <div>
                <h4 className="font-semibold text-lg">{mentor.name}</h4>
                <p className="text-gray-600">{mentor.user_type}</p>
              </div>
              <button className="text-xs text-amber-950 border border-amber-950 px-2 py-1 rounded">
                프로필 보기
              </button>
            </div>

            <div className="mt-3">
              <div className="flex flex-wrap gap-1 mb-2">
                <span className="text-xs bg-amber-100 text-amber-950 px-2 py-1 rounded">
                  {mentor.career}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">커피챗 비용:</span>{" "}
                {mentor.user_type === "현업자" ? 3 : 1}포인트
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <span className="font-medium">가능 날짜:</span>{" "}
                {mentor.coffee_chat_schedule.length}일 가능
              </p>
              <button className="w-full py-2 bg-amber-950 text-white hover:bg-amber-900 rounded-lg transition-colors">
                신청하기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindMentors;
