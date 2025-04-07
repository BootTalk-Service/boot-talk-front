export const getStatusBadge = (status: string) => {
  const statusInfo: Record<
    string,
    { bgColor: string; textColor: string; borderColor: string; text: string }
  > = {
    APPROVED: {
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      borderColor: "border-emerald-200",
      text: "승인됨",
    },
    PENDING: {
      bgColor: "bg-gray-50",
      textColor: "text-gray-600",
      borderColor: "border-gray-200",
      text: "대기중",
    },
    REJECTED: {
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      borderColor: "border-red-200",
      text: "거절됨",
    },
    CANCELED: {
      bgColor: "bg-gray-50",
      textColor: "text-gray-500",
      borderColor: "border-gray-200",
      text: "취소됨",
    },
    default: {
      bgColor: "bg-gray-50",
      textColor: "text-gray-500",
      borderColor: "border-gray-200",
      text: "알 수 없음",
    },
  };

  const { bgColor, textColor, borderColor, text } =
    statusInfo[status] || statusInfo.default;

  return (
    <div
      className={`px-2 py-0.5 text-xs font-medium rounded border ${bgColor} ${textColor} ${borderColor}`}
    >
      {text}
    </div>
  );
};
