"use client";

import React, { useState } from "react";
import MentorFormModal from "./MentorFormModal";

const CoffeeChatHeader: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">커피챗</h1>
        <button
          className="px-4 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-950 transition-colors"
          onClick={openModal}
        >
          멘토 등록
        </button>
      </div>

      {/* 커피챗 멘토 등록 모달 */}
      <MentorFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        mode={"create"}
      />
    </>
  );
};

export default CoffeeChatHeader;
