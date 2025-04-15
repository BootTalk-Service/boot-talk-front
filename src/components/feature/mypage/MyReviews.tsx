import { useGetMyReviews } from "@/hooks/my-page/useGetMyReviews";
import React from "react";

const MyReviews = () => {
  const { myReviews, isMyReviewsLoading, isMyReviewsError } = useGetMyReviews();

  if (isMyReviewsLoading) return <div>Loading...</div>;
  if (isMyReviewsError) return <div>Error loading reviews</div>;

  console.log("myReviews", myReviews);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? "text-yellow-500" : "text-gray-300"}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="mx-auto">
      {myReviews?.length === 0 ? (
        <p className="text-gray-500">작성된 리뷰가 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {myReviews?.map((review) => (
            <div
              key={review.reviewId}
              className="bg-white p-4 rounded-lg shadow border border-gray-200"
            >
              <div className="mb-2">
                <h2 className="text-sm">{review.courseName}</h2>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-xs">{renderStars(review.rating)}</span>
                <span className="text-xs ml-2 text-gray-700">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm">{review.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
