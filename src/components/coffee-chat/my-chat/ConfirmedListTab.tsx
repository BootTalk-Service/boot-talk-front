import React from "react";

const ConfirmedListTab = () => {
  const coffeeChats = [
    {
      id: 1,
      title: "프론트엔드 상담 받고 싶어요",
      host: "나",
      date: "2025-03-30",
      status: "예정됨",
    },
    {
      id: 2,
      title: "리액트 학습 팁 알려주세요",
      host: "나",
      date: "2025-04-02",
      status: "예정됨",
    },
    {
      id: 3,
      title: "주니어 개발자 성장에 대해서 궁금해요",
      host: "박주니어",
      date: "2025-04-05",
      status: "예정됨",
    },
  ];
  return (
    <div className="mt-4">
      <div className="space-y-3">
        {coffeeChats.map((chat) => (
          <div key={chat.id} className="p-3 bg-white rounded shadow">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{chat.title}</h4>
              <span className="text-sm text-green-600">{chat.status}</span>
            </div>
            <p className="text-sm text-gray-600">주최자: {chat.host}</p>
            <p className="text-sm text-gray-500">일자: {chat.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfirmedListTab;
