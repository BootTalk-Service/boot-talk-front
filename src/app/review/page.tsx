'use client';

import { useState } from 'react';
import type { Bootcamp } from '@/types/Bootcamp';
import SearchSection from '@/components/common/SearchSection';
import ReviewModal from '@/components/feature/review/ReviewModal';
import { useUserStore } from '@/store/user';
import { toast } from 'react-toastify';
import ReviewList from '@/components/feature/review/ReviewList';

export default function ReviewPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bootcamp, setBootcamp] = useState<Bootcamp | null>(null);
  const user = useUserStore((state) => state.user);
  const canWriteReview = (user?.bootcamps ?? []).length > 0;

  const handleReviewClick = () => {
    if (!user) {
      toast.error('로그인 후, 작성 부탁드립니다');
      return;
    }
    if (!canWriteReview) {
      toast.error('작성 가능한 부트캠프가 없습니다');
      return;
    }

    setBootcamp(user.bootcamps[0]);
    setIsModalOpen(true);
  };

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

        <main>
          <ReviewList />
        </main>
      </section>

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
