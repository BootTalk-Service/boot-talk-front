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
    <div className="overflow-x-auto">
      {/* 요약 정보 */}
      <div className="bg-base-200 p-4 rounded-xl shadow mb-6">
        <p className="text-md font-medium">
          현재 포인트:{" "}
          <span className="font-bold">
            {pointHistory[pointHistory.length - 1].current_points}P
          </span>
        </p>
      </div>

      {/* 테이블 포인트 리스트 */}
      <table className="table w-full">
        <thead>
          <tr className="text-base-content">
            <th>이벤트</th>
            <th>날짜</th>
            <th className="text-right">변동</th>
            <th className="text-right">잔여 포인트</th>
          </tr>
        </thead>
        <tbody>
          {pointHistory.map((point) => (
            <tr key={point.point_id}>
              <td className="font-medium">{point.event_type}</td>
              <td>{new Date(point.created_at).toLocaleString()}</td>
              <td
                className={`text-right font-bold ${
                  point.type === "EARN" ? "text-blue-600" : "text-red-600"
                }`}
              >
                {point.type === "EARN" ? "+" : ""}
                {point.changed_points}P
              </td>
              <td className="text-right text-sm text-gray-600">
                {point.current_points}P
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PointHistory;
