"use client";

import { useState } from "react";
import { useGetCertificationList } from "@/hooks/admin/useGetCertificationList";
import { usePatchCertificationStatus } from "@/hooks/admin/usePatchCertificationStatus";
import PaginationControls from "./PaginationControls";
import ImageModal from "./ImageModal";
import { Certification } from "@/types/certification";

const CertificationApproval = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const {
    data: certifications = [],
    isLoading,
    isError,
    refetch,
  } = useGetCertificationList();

  const { mutate: patchStatus } = usePatchCertificationStatus();

  const ITEMS_PER_PAGE = 5;
  const filtered = certifications.filter((cert: Certification) => cert.status === "PENDING");
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleStatusChange = (id: number, status: "APPROVED" | "REJECTED") => {
    patchStatus(
      { id, status },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>불러오지 못했습니다.</p>;

  return (
    <div className="space-y-4 relative">
      {paginated.length === 0 ? (
        <p className="text-gray-500">수료증 인증 요청이 없습니다.</p>
      ) : (
        paginated.map((cert: Certification) => (
          <div
            key={cert.certificationId}
            className="p-4 border border-gray-200 rounded-lg shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-medium">{cert.userName}</p>
              <p className="text-sm text-gray-500">직무 : {cert.categoryType}</p>
            </div>
            <div className="space-x-2 flex items-center">
              <button
                onClick={() => handleStatusChange(cert.certificationId, "APPROVED")}
                className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                승인
              </button>
              <button
                onClick={() => handleStatusChange(cert.certificationId, "REJECTED")}
                className="px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                거절
              </button>
              <button
                onClick={() => setSelectedImage(cert.fileUrl)}
                className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                수료증 보기
              </button>
            </div>
          </div>
        ))
      )}

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      <ImageModal
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
    </div>
  );
};

export default CertificationApproval;
