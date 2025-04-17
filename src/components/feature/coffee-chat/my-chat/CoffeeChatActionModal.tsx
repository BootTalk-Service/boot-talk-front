// CoffeeChatActionModal.tsx
import Modal from "@/components/common/modal/CommonModal";
import React from "react";

export type ActionType = "APPROVE" | "REJECT" | "CANCEL";

interface CoffeeChatActionModalProps {
  isOpen: boolean;
  actionType: ActionType;
  isPenalty: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  isMentor: boolean;
}

const CoffeeChatActionModal: React.FC<CoffeeChatActionModalProps> = ({
  isOpen,
  actionType,
  isPenalty,
  onClose,
  onConfirm,
  isLoading = false,
  isMentor = true,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} hideHeader={true} size="sm">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">
          {actionType === "APPROVE" && "커피챗 승인"}
          {actionType === "REJECT" && "커피챗 거절"}
          {actionType === "CANCEL" && "커피챗 취소"}
        </h3>

        <p className="mb-4">
          {actionType === "APPROVE" && "커피챗을 승인하시겠습니까?"}
          {actionType === "REJECT" && "커피챗을 거절하시겠습니까?"}
          {actionType === "CANCEL" && "승인된 커피챗을 취소하시겠습니까?"}
        </p>

        {/* 패널티 경고 메시지 */}
        {actionType === "CANCEL" && isPenalty && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">주의!</p>
            {isMentor ? (
              <p>시작 1일 전 취소 시 패널티가 부여됩니다.</p>
            ) : (
              <p>시작 1일 전 취소 시 환불이 불가능합니다.</p>
            )}
          </div>
        )}

        {/* 버튼 영역 */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="btn btn-outline"
            disabled={isLoading}
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className={`btn ${
              actionType === "APPROVE"
                ? "btn-primary"
                : actionType === "REJECT"
                ? "btn-warning"
                : "btn-error"
            } ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {actionType === "APPROVE" && "승인하기"}
            {actionType === "REJECT" && "거절하기"}
            {actionType === "CANCEL" && "취소하기"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CoffeeChatActionModal;
