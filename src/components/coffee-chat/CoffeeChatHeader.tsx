"use client";

import React, { useState } from "react";
import MentorSignupModal from "./MentorSignupModal";

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
        <h1 className="text-2xl font-bold text-amber-950">커피챗</h1>
        <button
          className="px-4 py-2 bg-amber-950 text-white rounded-lg hover:bg-amber-900 transition-colors"
          onClick={openModal}
        >
          커피챗 등록
        </button>
      </div>

      {/* 커피챗 멘토 등록 모달 */}
      <MentorSignupModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default CoffeeChatHeader;
