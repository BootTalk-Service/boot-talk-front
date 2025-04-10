"use client";

import { useWebSocket } from "@/hooks/useWebSocket";
import { ChatRoom } from "@/types/response";
import { useEffect, useRef, useState } from "react";

interface ChatRoomPageProps {
  selectedChat: ChatRoom;
}

interface ChatMessage {
  id?: number;
  roomUuid: string;
  senderId: number;
  senderName: string;
  receiverId: number;
  message: string;
  type: string;
}

const ChatRoomPage = ({ selectedChat }: ChatRoomPageProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  // const userId = localStorage.getItem("USER_ID");
  const userId = "8056"; // 유저id

  // 새 메시지가 추가될 때마다 스크롤을 아래로 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const { sendMessage, connected } = useWebSocket({
    roomUuid: selectedChat.roomUuid,
    onMessage: (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
      console.log("받은 메시지:", msg);
    },
    isActive: selectedChat.isActive,
  });

  const getRemainingMinutes = (endStr: string) => {
    const now = new Date();
    const end = new Date(endStr);
    const diff = end.getTime() - now.getTime();
    return Math.floor(diff / (1000 * 60));
  };

  // 메시지 전송 함수
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "" || !selectedChat) return;

    const msg = {
      roomUuid: selectedChat.roomUuid,
      senderId: 8056, // 로그인한 사용자 ID
      senderName:
        selectedChat.mentorId === Number(userId)
          ? selectedChat.mentorName
          : selectedChat.menteeName, // 사용자 이름 (추가 로직: 로그인한 사용자 이름)
      receiverId:
        selectedChat.mentorId === Number(userId)
          ? selectedChat.menteeId
          : selectedChat.mentorId, // 상대방 ID (추가 로직: 멘토가 나라면 멘티 이름)
      message: message,
      type: "TEXT",
    };

    if (connected) {
      sendMessage(msg);
    } else {
      console.error("WebSocket 연결이 끊어졌습니다.");
    }
    // 화면 내 메시지 표시
    setMessages((prev) => [...prev, msg]);

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
        {messages.map((msg, index) => (
          <div
            key={msg.id || `msg-${index}`}
            className={`mb-3 ${
              msg.senderId === Number(userId) ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block max-w-xs sm:max-w-sm rounded-lg p-2 ${
                msg.senderId === Number(userId)
                  ? "bg-blue-500 text-white"
                  : "bg-white border border-gray-200"
              }`}
            >
              <p className="text-sm">{msg.message}</p>
            </div>
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
