import React from "react";

const ChattingListTab = () => {
  const conversations = [
    {
      id: 1,
      title: "웹 성능 최적화",
      participant: "노성능",
      date: "2025-03-25",
      messages: 12,
    },
    {
      id: 2,
      title: "UI/UX 디자인 팁",
      participant: "유디자인",
      date: "2025-03-20",
      messages: 28,
    },
  ];
  return (
    <div className="mt-4">
      <div className="space-y-3">
        {conversations.map((conversation) => (
          <div key={conversation.id} className="p-3 bg-white rounded shadow">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{conversation.title}</h4>
              <span className="text-sm text-gray-500">
                {conversation.messages}개 메시지
              </span>
            </div>
            <p className="text-sm text-gray-600">
              참여자: {conversation.participant}
            </p>
            <p className="text-sm text-gray-500">일자: {conversation.date}</p>
            <button className="mt-2 text-xs px-2 py-1 bg-amber-950 text-white rounded cursor-pointer">
              채팅 계속하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChattingListTab;
