"use client";

import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { CoffeeChat } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import CoffeeChatDetailModal from "./CoffeeChatDetailModal";
import { getStatusBadge } from "./getStatusBadge";

const ReceivedListTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoffeeChat, setSelectedCoffeeChat] =
    useState<CoffeeChat | null>(null);

  const {
    data: receivedList,
    isLoading,
    isError,
  } = useQuery<CoffeeChat[]>({
    queryKey: ["receivedList"],
    queryFn: async () => {
      const response = await axiosDefault.get(END_POINT.RECEIVED_COFFEE_CHATS);
      return response.data;
    },
  });

  const handleCoffeeChatClick = (coffeechat: CoffeeChat) => {
    setSelectedCoffeeChat(coffeechat);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 날짜 포맷 헬퍼 함수
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ko-KR", {
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-4 p-4 bg-red-50 rounded-lg text-center">
        <p className="text-red-500">
          데이터를 불러오는 중 오류가 발생했습니다.
        </p>
        <button
          className="mt-2 text-sm text-blue-500 hover:underline"
          onClick={() => window.location.reload()}
        >
          새로고침
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4">
      {receivedList && receivedList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {receivedList.map((received) => (
            <div
              key={received.coffeeChatAppId}
              className="p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleCoffeeChatClick(received)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm truncate max-w-xs">
                  {received.content.length > 30
                    ? received.content.substring(0, 30) + "..."
                    : received.content}
                </h4>
                {received.status !== "PENDING" &&
                  getStatusBadge(received.status)}
              </div>
              <div className="flex items-center text-xs text-gray-500 gap-4 mb-2">
                <p>신청자: {received.menteeName}</p>
                <p>신청일: {formatDate(received.coffeeChatStartTime)}</p>
              </div>

              {/* 승인/거절 버튼 (PENDING 상태일 때만 표시) */}
              <div className="flex mt-2 space-x-2">
                {received.status === "PENDING" && (
                  <>
                    <button
                      className="px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-medium hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      승인하기
                    </button>
                    <button
                      className="px-3 py-1.5 bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      거절하기
                    </button>
                  </>
                )}

                {received.status === "APPROVED" && (
                  <button
                    className="px-3 py-1.5 bg-gray-500 text-white rounded text-xs font-medium hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    취소하기
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center py-8">
          <p className="text-gray-500">받은 커피챗 신청이 없습니다.</p>
        </div>
      )}

      {/* 커피챗 상세 정보 모달 */}
      <CoffeeChatDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        coffeeChat={selectedCoffeeChat}
      />
    </div>
  );
};

export default ReceivedListTab;
