"use client";

import { useEffect } from "react";
import AdminPageLayout from "@/components/feature/admin/AdminPageLayout";
import CertificationApproval from "@/components/feature/admin/CertificationApproval";
import { useAdminPageData } from "@/hooks/admin/useAdminPageData";

export default function AdminPage() {
  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_USE_MOCK === "true" &&
      typeof window !== "undefined"
    ) {
      import("@/mocks/browser").then(({ worker }) => worker.start());
    }
  }, []);

  const { isLoading, isError } = useAdminPageData();

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>인증 데이터를 불러오지 못했습니다.</div>;

  return (
    <AdminPageLayout>
      <CertificationApproval />
    </AdminPageLayout>
  );
}