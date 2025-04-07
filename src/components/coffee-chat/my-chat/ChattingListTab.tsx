import React from "react";

const ChattingListTab = () => {
  const conversations = [
    {
      id: 1,
      title: "웹 성능 최적화",
      participant: "이승우",
      date: "2025-03-25",
      unreadCount: 2,
      lastMessage: "감사합니다!",
    },
    {
      id: 2,
      title: "UI/UX 디자인 팁",
      participant: "조현우",
      date: "2025-03-20",
      unreadCount: 10,
      lastMessage: "나중에 기회되면 다시 연락드릴게요.",
    },
  ];
  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-sm">
                {conversation.participant}
              </h4>
              <span className="text-xs text-gray-500">
                {new Date(conversation.date).toLocaleDateString("ko-KR")}
              </span>
            </div>

            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                {conversation.lastMessage}
              </span>
              {conversation.unreadCount > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs  bg-red-500 text-white rounded-full">
                  {conversation.unreadCount}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChattingListTab;
