"use client";

import ReviewItem from "./ReviewItem";
import type { ReviewPage } from "@/types/Bootcamp";

interface ReviewListProps {
  reviews: ReviewPage[];
  error?: string | null;
}

export default function ReviewList({ reviews, error }: ReviewListProps) {
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!reviews || reviews.length === 0) {
    return <p className="text-center text-gray-500">아직 리뷰가 없습니다.</p>;
  }

  return (
    <section className="space-y-6">
      {reviews.map((review) => (
        <ReviewItem
          key={`${review.reviewId}-${review.trainingProgramId}`}
          review={review}
        />
      ))}
    </section>
  );
}
