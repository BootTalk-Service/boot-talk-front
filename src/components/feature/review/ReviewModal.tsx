"use client";

import { useState } from "react";
import Modal from "@/components/common/modal/CommonModal";
import { RatingSelector } from "@/components/feature/review/RatingSelector";
import type { Bootcamp } from "@/types/Bootcamp";
import { toast } from "react-toastify";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bootcamp: Bootcamp;
}

export default function ReviewModal({ isOpen, onClose, bootcamp }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (rating === 0 || content.trim() === "") {
      toast.error("별점과 후기를 모두 작성해주세요!");
      return;
    }

    console.log("제출:", { rating, content });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="리뷰 작성" size="lg">
      <div className="space-y-4 text-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <input className="input input-bordered w-full" disabled value={bootcamp.training_center_name} />
          <input className="input input-bordered w-full" disabled value={bootcamp.bootcamp_category} />
          <input className="input input-bordered w-full" disabled value={`${bootcamp.bootcamp_degree}기`} />
          <input
            className="input input-bordered w-full"
            disabled
            value={`${bootcamp.bootcamp_start_date} ~ ${bootcamp.bootcamp_end_date}`}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">별점</span>
          <RatingSelector value={rating} onChange={setRating} />
        </div>

        <div>
          <textarea
            placeholder="후기를 작성해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={500}
            className="textarea textarea-bordered w-full h-28 resize-none focus:outline-none"
          />
          <div className="text-right text-sm text-gray-400">{content.length}/500</div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button className="btn btn-outline border-gray-400 rounded-lg" onClick={onClose}>
            취소
          </button>
          <button className="btn bg-amber-900 text-white rounded-lg" onClick={handleSubmit}>
            작성
          </button>
        </div>
      </div>
    </Modal>
  );
}
