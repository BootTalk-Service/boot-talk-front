import type { ReviewPage } from "@/types/Bootcamp";
import { RatingStars } from "@/components/common/RatingStars";

interface ReviewItemProps {
  review: ReviewPage;
}

export default function ReviewItem({ review }: ReviewItemProps) {
  return (
    <div
      className="flex justify-between items-start p-5 bg-white rounded-xl border border-gray-100 shadow-md text-neutral-800
      transition-shadow duration-300 ease-in-out hover:shadow-lg cursor-pointer hover:bg-amber-50"
    >
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-sm">{review.courseName}</p>
        <p className="text-xs text-gray-500">{review.userName}</p>

        <div className="flex items-center gap-1">
          <RatingStars rating={review.rating} />
          <span className="text-xs text-gray-400 ml-2">
            {review.createdAt?.split("T")[0]}
          </span>
        </div>

        <p className="text-sm mt-2 whitespace-pre-wrap">{review.content}</p>
      </div>

      <button className="text-xs text-gray-400 hover:text-red-400 ml-4 whitespace-nowrap">
        신고하기
      </button>
    </div>
  );
}

