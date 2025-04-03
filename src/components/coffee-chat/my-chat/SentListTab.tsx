import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { CoffeeChat } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import CoffeeChatDetailModal from "./CoffeeChatDetailModal";

const SentListTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoffeeChat, setSelectedCoffeeChat] =
    useState<CoffeeChat | null>(null);

  const {
    data: sentList,
    isLoading,
    isError,
  } = useQuery<CoffeeChat[]>({
    queryKey: ["sentList"],
    queryFn: async () => {
      const response = await axiosDefault.get(END_POINT.SENT_COFFEE_CHATS);
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
      {sentList && sentList?.length > 0 ? (
        <div className="space-y-3">
          {sentList?.map((sent) => (
            <div
              key={sent.coffeeChatApplicationId}
              className="p-3 bg-white rounded shadow"
              onClick={() => handleCoffeeChatClick(sent)}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-medium truncate w-full">{sent.content}</h4>
                <span
                  className={`text-sm min-w-fit ${
                    sent.status === "CONFIRMED"
                      ? "text-emerald-600"
                      : "text-amber-700"
                  }`}
                >
                  {sent.status === "CONFIRMED" ? "승인됨" : "대기중"}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                주최자: {sent.applierName}
              </p>
              <p className="text-sm text-gray-500">
                일자: {new Date(sent.request_start_time).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>보낸 커피챗 신청이 없습니다.</p>
      )}

      {/* 커피챗 상세 정보 모달 */}
      <CoffeeChatDetailModal
        isSent={true}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        coffeeChat={selectedCoffeeChat}
      />
    </div>
  );
};

export default SentListTab;
