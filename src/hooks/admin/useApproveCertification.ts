"use client";

import { useMutation } from "@tanstack/react-query";
import { END_POINT } from "@/constants/endPoint";

const approveCertification = async (data: {
  fileUrl: string;
  courseId: number;
  categoryName: string;
  status: string;
}) => {
  const res = await fetch(END_POINT.ADMIN_CERTIFICATION, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorMessage = `수료증 승인 실패 (상태 코드: ${res.status})`;
    throw new Error(errorMessage);
  }

  return res.json();
};

export const useApproveCertification = () => {
  return useMutation({
    mutationFn: approveCertification,
  });
};
