"use client";

import { useState } from "react";

const ChatRoomPage = ({ selectedChat }) => {
  const [message, setMessage] = useState("");

  // 가상의 메시지 데이터 - 선택된 채팅이 있을 때만 생성
  const messages = selectedChat
    ? [
        { id: 1, sender: "me", text: "안녕하세요!", time: "17:30" },
        {
          id: 2,
          sender: selectedChat.participant,
          text: "안녕하세요, 무엇을 도와드릴까요?",
          time: "17:32",
        },
        {
          id: 3,
          sender: "me",
          text: "상담 가능한 시간이 언제인가요?",
          time: "17:33",
        },
        {
          id: 4,
          sender: selectedChat.participant,
          text: selectedChat.lastMessage,
          time: selectedChat.time,
        },
      ]
    : [];

  const getRemainingMinutes = (endStr: string) => {
    const now = new Date();
    const end = new Date(endStr);
    const diff = end.getTime() - now.getTime();
    return Math.floor(diff / (1000 * 60));
  };

  // 메시지 전송 함수
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "" || !selectedChat) return;

    // 여기에 메시지 전송 로직 추가
    console.log("메시지 전송:", message);

    // 입력창 초기화
    setMessage("");
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-lg border border-gray-100 shadow-sm">
      {/* 채팅방 헤더 */}
      <div className="p-3 border-b flex justify-between items-center">
        <div>
          <h3 className="font-medium">{selectedChat.mentorName}</h3>
        </div>
        <div className="text-xs text-gray-500">
          {getRemainingMinutes(selectedChat.expiresAt)}분 남음
        </div>
      </div>

      {/* 채팅 메시지 영역 */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-3 ${
              msg.sender === "me" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block max-w-xs sm:max-w-sm rounded-lg p-2 ${
                msg.sender === "me"
                  ? "bg-blue-500 text-white"
                  : "bg-white border border-gray-200"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
            <div className="text-xs text-gray-500 mt-1">{msg.time}</div>
          </div>
        ))}
      </div>

      {/* 메시지 입력 영역 */}
      <form onSubmit={handleSendMessage} className="p-3 border-t flex">
        <input
          type="text"
          className="flex-1 border rounded-l-lg px-3 py-2"
          placeholder="메시지를 입력"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors"
        >
          전송
        </button>
      </form>
    </div>
  );
};

export default ChatRoomPage;
