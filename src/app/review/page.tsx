"use client";

import { useEffect, useState } from "react";
import ReviewItem from "@/components/feature/review/ReviewItem";
import { ReviewFilterButtons } from "@/components/feature/review/ReviewFilterButtons";
import type { ReviewPage } from "@/types/Bootcamp";
import SearchSection from "@/components/common/SerchSectioin";


export default function ReviewPage() {
  const [reviews, setReviews] = useState<ReviewPage[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
        const { worker } = await import("@/mocks/browser");
        await worker.start();
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      try {
        const res = await fetch("/api/reviews");
        if (!res.ok) throw new Error("리뷰 데이터를 불러올 수 없습니다.");
        const data = await res.json();
        setReviews(data.content);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("알 수 없는 오류가 발생했습니다.");
      }
    };

    init();
  }, []);

  return (
    <>
      <SearchSection />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* 제목 */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-1">부트캠프 리뷰 모음</h1>
          <p className="text-gray-500">수강생들의 생생한 이야기를 확인해보세요</p>
        </div>

        {/* 필터 */}
        <div className="flex justify-between items-center mb-6">
        <ReviewFilterButtons
          onFilterChange={(filters) => {
            console.log("필터 선택됨:", filters);
          }}
        />
        <span className="text-sm text-gray-400">총 {reviews.length}개</span>
      </div>

        {/* 리스트 */}
        <main >
          {error && <p className="text-center text-red-500">{error}</p>}
          {!error && reviews.length === 0 && (
            <p className="text-center text-gray-500">아직 리뷰가 없습니다.</p>
          )}

          <section className="space-y-6">
            {reviews.map((review) => (
              <ReviewItem
              
                key={`${review.reviewId}-${review.trainingProgramId}`}
                review={review}
              />
            ))}
          </section>
        </main>
      </section>
    </>
  );
}
