import { Star } from "lucide-react";
import type { Review } from "@/types/Bootcamp";

interface ReviewItemProps {
  review: Review;
}

export default function ReviewItem({ review }: ReviewItemProps) {
  return (
    <div className="flex justify-between items-start min-h-[100px] p-5 bg-white text-amber-950 border border-gray-100 rounded-xl shadow-md">
      <div>
        <p className="font-semibold">{review.userName}</p>
        <div className="flex items-center gap-1">
          {/* 별점 */}
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            />
          ))}
          <span className="text-xs text-gray-400 ml-2">{review.created_at}</span>
        </div>
        <p className="whitespace-pre-wrap text-gray-700 mt-2">{review.content}</p>
      </div>

      <button className="text-xs text-gray-400 hover:text-red-400">신고하기</button>
    </div>  
  );
}