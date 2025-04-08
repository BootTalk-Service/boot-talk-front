import React from "react";

const ChattingListTab = () => {
  const conversations = [
    {
      id: 1,
      participant: "이승우",
      date: "2025-03-25",
      time: "19:30",
      unread: true,
      lastMessage: "감사합니다!",
      status: "진행 중",
    },
    {
      id: 2,
      participant: "조현우",
      date: "2025-03-20",
      time: "20:30",
      unread: false,
      lastMessage: "나중에 기회되면 다시 연락드릴게요.",
      status: "종료",
    },
    {
      id: 3,
      participant: "김지훈",
      date: "2025-04-10",
      time: "18:00",
      unread: true,
      lastMessage: "그날 뵙겠습니다.",
      status: "예정",
    },
  ];

  const getStatusBadge = (status) => {
    const base = "px-2 py-0.5 text-xs font-medium rounded border ";
    switch (status) {
      case "종료":
        return `${base}bg-gray-100 text-gray-500 border-gray-300`;
      case "진행 중":
        return `${base}bg-blue-100 text-blue-600 border-blue-300`;
      case "예정":
        return `${base}bg-yellow-50 text-yellow-600 border-yellow-200`;
      default:
        return base;
    }
  };

  const getStatusLabel = (status, date, time) => {
    if (status === "종료") return `종료일: ${date} ${time}`;
    if (status === "예정") return `예정일: ${date} ${time}`;
    if (status === "진행 중") return "현재 진행 중입니다.";
    return "";
  };

  const getCardStyle = (status) => {
    switch (status) {
      case "종료":
        return "bg-gray-50 text-gray-400";
      case "예정":
        return "opacity-60";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="mt-4">
      {conversations && conversations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`relative p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer ${getCardStyle(
                conversation.status
              )}`}
            >
              {/* 빨간 점 알림 */}
              {conversation.status === "진행 중" && conversation.unread && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-sm">
                  {conversation.participant}
                </h4>
                <span className={getStatusBadge(conversation.status)}>
                  {conversation.status}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {getStatusLabel(
                  conversation.status,
                  conversation.date,
                  conversation.time
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center py-8">
          <p className="text-gray-500">채팅 목록이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default ChattingListTab;
