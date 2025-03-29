import { useCoffeeChatStore } from "@/store/coffee-chat/useCoffeeChatStore";
import MyChatTabNavigation from "./MyChatTabNavigation";

export default function MyChats() {
  const { subTab } = useCoffeeChatStore();

  // 더미 데이터
  const coffeeChats = [
    {
      id: 1,
      title: "프론트엔드 개발 이야기",
      host: "김개발",
      date: "2025-03-30",
      status: "예정됨",
    },
    {
      id: 2,
      title: "리액트 학습 팁",
      host: "이리액트",
      date: "2025-04-02",
      status: "예정됨",
    },
    {
      id: 3,
      title: "주니어 개발자 성장기",
      host: "박주니어",
      date: "2025-04-05",
      status: "예정됨",
    },
  ];

  const sentRequests = [
    {
      id: 1,
      title: "TypeScript 배우기",
      host: "최타입",
      date: "2025-03-29",
      status: "대기중",
    },
    {
      id: 2,
      title: "CSS 트릭스",
      host: "정스타일",
      date: "2025-04-01",
      status: "승인됨",
    },
  ];

  const receivedRequests = [
    {
      id: 1,
      title: "자바스크립트 질문",
      requester: "한자바",
      date: "2025-03-28",
      status: "대기중",
    },
    {
      id: 2,
      title: "개발 커리어 상담",
      requester: "황커리어",
      date: "2025-04-03",
      status: "대기중",
    },
  ];

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
      <MyChatTabNavigation />

      {/* 서브탭에 따른 컨텐츠 렌더링 */}
      {subTab === "list" && (
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
      )}

      {subTab === "sent" && (
        <div className="mt-4">
          <div className="space-y-3">
            {sentRequests.map((request) => (
              <div key={request.id} className="p-3 bg-white rounded shadow">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{request.title}</h4>
                  <span
                    className={`text-sm ${
                      request.status === "승인됨"
                        ? "text-emerald-600"
                        : "text-amber-700"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">주최자: {request.host}</p>
                <p className="text-sm text-gray-500">일자: {request.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === "received" && (
        <div className="mt-4">
          <div className="space-y-3">
            {receivedRequests.map((request) => (
              <div key={request.id} className="p-3 bg-white rounded shadow">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{request.title}</h4>
                  <div>
                    <span className="text-sm text-amber-700 mr-2">
                      {request.status}
                    </span>
                    <button className="text-sm px-3 py-1 bg-emerald-600 text-white rounded cursor-pointer">
                      수락
                    </button>
                    <button className="text-sm ml-2 px-3 py-1 bg-gray-500 text-white rounded cursor-pointer">
                      거절
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  신청자: {request.requester}
                </p>
                <p className="text-sm text-gray-500">일자: {request.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === "conversations" && (
        <div className="mt-4">
          <div className="space-y-3">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="p-3 bg-white rounded shadow"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{conversation.title}</h4>
                  <span className="text-sm text-gray-500">
                    {conversation.messages}개 메시지
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  참여자: {conversation.participant}
                </p>
                <p className="text-sm text-gray-500">
                  일자: {conversation.date}
                </p>
                <button className="mt-2 text-xs px-2 py-1 bg-amber-950 text-white rounded cursor-pointer">
                  채팅 계속하기
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
