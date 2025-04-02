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
    <div className="max-w-4xl mx-auto">
      {myReviews?.length === 0 ? (
        <p className="text-gray-500">작성된 리뷰가 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {myReviews?.map((review) => (
            <div
              key={review.t_user_id}
              className="bg-white p-4 rounded-lg shadow border border-gray-200"
            >
              <div className="mb-2">
                <div>
                  <h2 className="font-bold text-lg mb-2 ">
                    {review.bootcampName}
                  </h2>
                  <p className="text-sm text-gray-600">{review.created_at}</p>
                </div>
              </div>

              <div className="mb-2">{renderStars(review.rating)}</div>

              <p className="text-gray-700 ">{review.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
