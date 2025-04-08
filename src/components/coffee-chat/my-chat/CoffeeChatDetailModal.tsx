import React from "react";

import {
  Calendar,
  Clock,
  MessageCircle,
  User,
  AlertCircle,
} from "lucide-react";
import { CoffeeChat } from "@/types/response";
import Modal from "@/components/common/modal/CommonModal";
import { getStatusBadge } from "./getStatusBadge";

interface CoffeeChatDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  coffeeChat: CoffeeChat | null;
  isSent?: boolean; // 보낸 커피챗인지 여부 (기본값: false)
}

/**
 * 커피챗 상세 정보 모달 컴포넌트
 * 받은 커피챗과 보낸 커피챗 모두 사용 가능
 */
const CoffeeChatDetailModal: React.FC<CoffeeChatDetailModalProps> = ({
  isOpen,
  onClose,
  coffeeChat,
  isSent = false,
}) => {
  if (!coffeeChat) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isSent ? "보낸 커피챗 상세 정보" : "받은 커피챗 상세 정보"}
      size="md"
    >
      <div className="space-y-4">
        {/* 상태 뱃지 */}
        <div className="flex items-center">
          <AlertCircle size={18} className="mr-2 " />
          <span className="mr-2 font-medium">상태:</span>
          {getStatusBadge(coffeeChat.status)}
        </div>

        {/* 신청자/주최자 정보 */}
        <div className="flex items-center">
          <User size={18} className="mr-2 " />
          <span className="mr-2 font-medium">
            {isSent ? "멘토" : "신청자"}:
          </span>
          <span>{isSent ? coffeeChat.mentoName : coffeeChat.menteeName}</span>
        </div>

        {/* 날짜 및 시간 정보 */}
        <div className="flex items-center">
          <Calendar size={18} className="mr-2 " />
          <span className="mr-2 font-medium">신청 일시:</span>
          <span>
            {new Date(coffeeChat.coffeeChatStartTime).toLocaleDateString(
              "ko-KR"
            )}
          </span>
        </div>

        <div className="flex items-center">
          <Clock size={18} className="mr-2 " />
          <span className="mr-2 font-medium">신청 시간:</span>
          <span>
            {new Date(coffeeChat.coffeeChatStartTime).toLocaleTimeString(
              "ko-KR",
              {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }
            )}
          </span>
        </div>

        {/* 메시지 */}
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <MessageCircle size={18} className="mr-2 self-start" />
            <span className="mr-2 font-medium whitespace-nowrap self-start">
              메시지:
            </span>
            <textarea
              className="bg-gray-50 border border-gray-400 w-full h-24 rounded-sm px-2 overflow-auto "
              value={coffeeChat.content}
              readOnly
            ></textarea>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CoffeeChatDetailModal;
