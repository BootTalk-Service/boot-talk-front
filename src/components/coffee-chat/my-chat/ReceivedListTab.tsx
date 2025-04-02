import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { CoffeeChat } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import CoffeeChatDetailModal from "./CoffeeChatDetailModal";

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

  if (isLoading) {
    return <p className="text-center text-gray-500">불러오는 중...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        데이터를 불러오는 중 오류가 발생했습니다.
      </p>
    );
  }

  return (
    <div className="mt-4">
      {receivedList && receivedList?.length > 0 ? (
        <div className="space-y-3">
          {receivedList?.map((received) => (
            <div
              key={received.coffeeChatApplicationId}
              className="p-3 bg-white rounded shadow"
              onClick={() => handleCoffeeChatClick(received)}
            >
              <div className="flex justify-between items-center gap-4">
                <h4 className="font-medium truncate flex-1">
                  {received.content}
                </h4>
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-sm text-amber-700 mr-2">
                    {received.status === "CONFIRMED" ? "승인됨" : "대기중"}
                  </span>
                  <button className="text-xs px-3 py-1 bg-emerald-600 text-white rounded cursor-pointer">
                    수락
                  </button>
                  <button className="text-xs ml-2 px-3 py-1 bg-gray-500 text-white rounded cursor-pointer">
                    거절
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                신청자: {received.applierName}
              </p>
              <p className="text-sm text-gray-500">
                일자: {new Date(received.request_start_time).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>보낸 커피챗 신청이 없습니다.</p>
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
