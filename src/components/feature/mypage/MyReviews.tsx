"use client";

import { useGetMyReviews } from "@/hooks/my-page/useGetMyReviews";
import { useGetMyInfo } from "@/hooks/my-page/useGetMyInfo";
import { Star, Trash2 } from "lucide-react";
import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { toast } from "react-toastify";
import React, { useState } from "react";
import ReviewModal from "@/components/feature/review/ReviewModal";
import WriteReviewButton from "@/components/feature/review/WriteReviewButton";
import type { ReviewBootcamp, Review } from "@/types/response";

export default function MyReviews() {
  const {
    myReviews = [],
    isMyReviewsLoading,
    isMyReviewsError,
    refetch,
  } = useGetMyReviews();
  const { myInfo, isMyInfoLoading, isMyInfoError } = useGetMyInfo();

  const [editTarget, setEditTarget] = useState<{
    bootcamp: ReviewBootcamp;
    reviewId: number;
    rating: number;
    content: string;
  } | null>(null);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));

  const handleDelete = async (reviewId: number) => {
    if (!confirm("리뷰를 삭제하시겠습니까?")) return;
    try {
      await axiosDefault.delete(END_POINT.DELETE_REVIEW(reviewId));
      toast.success("리뷰가 삭제되었습니다.");
      await refetch?.();
    } catch (err) {
      console.error(err);
      toast.error("리뷰 삭제 중 오류가 발생했습니다.");
    }
  };

  if (isMyReviewsLoading || isMyInfoLoading) return <div>Loading...</div>;
  if (isMyReviewsError || isMyInfoError) return <div>Error loading data</div>;

  const getCategoryName = (programId: string) =>
    myInfo?.certifications.find((c) => c.trainingProgramId === programId)
      ?.categoryName ?? "";

  return (
    <div className="mx-auto min-h-[450px] flex flex-col justify-between">
      <div className="space-y-4">
        {myReviews.length === 0 ? (
          <p className="text-gray-500 text-center">작성된 리뷰가 없습니다.</p>
        ) : (
          myReviews.map((review: Review) => (
            <div
              key={review.reviewId}
              className="relative bg-white p-4 rounded-lg shadow border border-gray-200 hover:bg-gray-50 transition-colors min-h-[180px] sm:min-h-[150px]"
            >
              {/* 제목 + 데스크탑 버튼 */}
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-sm font-semibold text-gray-700 max-w-[85%] break-words whitespace-normal">
                  {review.courseName}
                </h2>
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    className="text-sm text-gray-700 hover:text-amber-900"
                    onClick={() =>
                      setEditTarget({
                        bootcamp: {
                          courseName: review.courseName,
                          userName: myInfo?.name ?? review.userName,
                          trainingProgramId: review.trainingProgramId,
                          categoryName: getCategoryName(review.trainingProgramId),
                        },
                        reviewId: review.reviewId,
                        rating: review.rating,
                        content: review.content,
                      })
                    }
                  >
                    수정
                  </button>
                  <button
                    className="text-gray-700 hover:text-red-600"
                    onClick={() => handleDelete(review.reviewId)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 별점 + 날짜 */}
              <div className="flex items-center mb-1">
                {renderStars(review.rating)}
                <span className="text-xs ml-2 text-gray-700">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* 작성자 */}
              <p className="text-sm text-gray-500 mb-1">{review.userName}</p>

              {/* 본문 */}
              <p className="text-sm text-gray-800 break-normal whitespace-pre-line">
                {review.content}
              </p>

              {/* 모바일 하단 버튼 */}
              <div className="flex sm:hidden justify-end absolute bottom-3 right-4 gap-3">
                <button
                  className="text-sm text-gray-700 hover:text-amber-900"
                  onClick={() =>
                    setEditTarget({
                      bootcamp: {
                        courseName: review.courseName,
                        userName: myInfo?.name ?? review.userName,
                        trainingProgramId: review.trainingProgramId,
                        categoryName: getCategoryName(review.trainingProgramId),
                      },
                      reviewId: review.reviewId,
                      rating: review.rating,
                      content: review.content,
                    })
                  }
                >
                  수정
                </button>
                <button
                  className="text-gray-700 hover:text-red-600"
                  onClick={() => handleDelete(review.reviewId)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 리뷰 작성 버튼 */}
      <div className="flex justify-end mt-6">
        <WriteReviewButton />
      </div>

      {/* 수정 모달 */}
      {editTarget && (
        <ReviewModal
          isOpen={true}
          onClose={() => {
            setEditTarget(null);
            refetch?.();
          }}
          bootcamp={editTarget.bootcamp}
          mode="edit"
          reviewId={editTarget.reviewId}
          defaultRating={editTarget.rating}
          defaultContent={editTarget.content}
          refetch={refetch}
        />
      )}
    </div>
  );
}
