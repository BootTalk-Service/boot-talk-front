import { useGetPointHistory } from "@/hooks/my-page/useGetPointHistory";
import React from "react";

const PointHistory = () => {
  const { pointHistory, isPointHistoryLoading, isPointHistoryError } =
    useGetPointHistory();

  if (isPointHistoryLoading) return <div>로딩 중...</div>;

  if (isPointHistoryError)
    return <div>포인트 내역을 불러오는데 실패했습니다.</div>;

  // 데이터가 없는 경우 처리
  if (!pointHistory || pointHistory.length === 0)
    return <div>포인트 내역이 없습니다.</div>;

  return (
    <div>
      {/* 요약 정보 */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p className="text-lg font-medium">
          현재 포인트:{" "}
          <span className="text-blue-600 font-bold">
            {pointHistory[pointHistory.length - 1].current_points}P
          </span>
        </p>
      </div>

      {/* 포인트 리스트 */}
      <div className="space-y-3">
        {pointHistory.map((point) => (
          <div
            key={point.point_id}
            className="border rounded-lg border-gray-200 p-4 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-lg">{point.event_type}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(point.created_at).toLocaleString()}
                </p>
              </div>
              <div
                className={`font-bold text-lg ${
                  point.type === "EARN" ? "text-blue-600" : "text-red-600"
                }`}
              >
                {point.type === "EARN" ? "+" : ""}
                {point.changed_points}P
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-200 text-sm text-gray-500">
              <p>잔여 포인트: {point.current_points}P</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PointHistory;
