"use client";

import { useEffect, useState } from "react";
import { ReviewFilterButtons } from "@/components/feature/review/ReviewFilterButtons";
import type { ReviewPage, Bootcamp } from "@/types/Bootcamp";
import SearchSection from "@/components/common/SerchSectioin";
import ReviewModal from "@/components/feature/review/ReviewModal";
import { useUserStore } from "@/store/user";
import { toast } from "react-toastify";
import ReviewList from "@/components/feature/review/ReviewList";

export default function ReviewPage() {
  const [reviews, setReviews] = useState<ReviewPage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bootcamp, setBootcamp] = useState<Bootcamp | null>(null);

  const user = useUserStore((state) => state.user);
  const canWriteReview = (user?.bootcamps ?? []).length > 0;

  // 로그인한 유저만 모달 열림
  const handleReviewClick = () => {
    if (!user) {
      toast.error("로그인 후, 작성 부탁드립니다");
      return;
    }

    if (!canWriteReview) {
      toast.error("작성 가능한 부트캠프가 없습니다");
      return;
    }

    setBootcamp(user.bootcamps[0]);
    setIsModalOpen(true);
  };

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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-1">부트캠프 리뷰 모음</h1>
            <p className="text-gray-500">수강생들의 생생한 이야기를 확인해보세요</p>
          </div>

          <button
            className="btn px-4 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-950 transition-colors"
            onClick={handleReviewClick}
          >
            리뷰 작성
          </button>
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

        <main>
        <ReviewList reviews={reviews} error={error} />
        </main>
      </section>

      {/* 로그인 유저이면서 모달 오픈 시에만 */}
      {user && bootcamp && isModalOpen && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          bootcamp={bootcamp}
        />
      )}
    </>
  );
}
