"use client";

import { useGetMyReviews } from "@/hooks/my-page/useGetMyReviews";
import { Star, Trash2 } from "lucide-react";
import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";
import { toast } from "react-toastify";
import React, { useState } from "react";
import ReviewModal from "@/components/feature/review/ReviewModal";
import type { ReviewBootcamp } from "@/types/response";

const MyReviews = () => {
  const {
    myReviews = [],
    isMyReviewsLoading,
    isMyReviewsError,
    refetch,
  } = useGetMyReviews();

  const [editTarget, setEditTarget] = useState<{
    bootcamp: ReviewBootcamp;
    reviewId: number;
    rating: number;
    content: string;
  } | null>(null);

  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 추가

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const handleDelete = async (reviewId: number) => {
    const confirmed = confirm("리뷰를 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await axiosDefault.delete(END_POINT.DELETE_REVIEW(reviewId));
      toast.success("리뷰가 삭제되었습니다.");
      await refetch();
    } catch {
      toast.error("리뷰 삭제 중 오류가 발생했습니다.");
    }
  };

  if (isMyReviewsLoading) return <div>Loading...</div>;
  if (isMyReviewsError) return <div>Error loading reviews</div>;

  return (
    <div className="mx-auto min-h-[450px] flex flex-col justify-between">
      <div className="space-y-4">
        {myReviews.length === 0 ? (
          <p className="text-gray-500 text-center">작성된 리뷰가 없습니다.</p>
        ) : (
          myReviews.map((review) => (
            <div
              key={review.reviewId}
              className="relative bg-white p-4 rounded-lg shadow border border-gray-200 hover:bg-gray-50 transition-colors min-h-[180px] sm:min-h-[150px]"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-sm font-semibold text-gray-700 max-w-[85%] break-words whitespace-normal">
                  {review.courseName}
                </h2>

                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={() =>
                      setEditTarget({
                        bootcamp: {
                          courseName: review.courseName,
                          userName: review.userName || "",
                          trainingProgramId: review.trainingProgramId,
                          categoryName: "",
                        },
                        reviewId: review.reviewId,
                        rating: review.rating,
                        content: review.content,
                      })
                    }
                    className="text-sm text-gray-700 hover:text-amber-900"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(review.reviewId)}
                    className="text-gray-700 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center mb-1">
                <div className="flex">{renderStars(review.rating)}</div>
                <span className="text-xs ml-2 text-gray-700">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-1">{review.userName}</p>
              <p className="text-sm text-gray-800 break-normal whitespace-pre-line">
                {review.content}
              </p>

              <div className="flex sm:hidden justify-end absolute bottom-3 right-4 gap-3">
                <button
                  onClick={() =>
                    setEditTarget({
                      bootcamp: {
                        courseName: review.courseName,
                        userName: review.userName || "",
                        trainingProgramId: review.trainingProgramId,
                        categoryName: "",
                      },
                      reviewId: review.reviewId,
                      rating: review.rating,
                      content: review.content,
                    })
                  }
                  className="text-sm text-gray-700 hover:text-amber-900"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(review.reviewId)}
                  className="text-gray-700 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={() => setIsWriteModalOpen(true)}
          className="bg-amber-900 text-white py-2 px-4 rounded hover:bg-amber-800 text-sm"
        >
          리뷰 작성
        </button>
      </div>

      {editTarget && (
        <ReviewModal
          isOpen={!!editTarget}
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

      {isWriteModalOpen && (
        <ReviewModal
          isOpen={isWriteModalOpen}
          onClose={() => {
            setIsWriteModalOpen(false);
            refetch?.();
          }}
          mode="create"
          reviewId={0}
          bootcamp={{
            courseName: "",
            userName: "",
            trainingProgramId: "",
            categoryName: "",
          }}
          defaultRating={0}
          defaultContent=""
          refetch={refetch}
        />
      )}

    </div>
  );
};

export default MyReviews;
