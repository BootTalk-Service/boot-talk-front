"use client";

import RequireAuth from "@/components/common/RequireAuth";
import Certificates from "@/components/feature/mypage/Certificates";
import MentorProfile from "@/components/feature/mypage/MentorProfile";
import MyPageLayout from "@/components/feature/mypage/MyPageLayout";
import MyReviews from "@/components/feature/mypage/MyReviews";
import PointHistory from "@/components/feature/mypage/PointHistory";
import ProfileEdit from "@/components/feature/mypage/ProfileEdit";
import { useRouter, useSearchParams } from "next/navigation";

export default function Mypage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = (searchParams.get("tab") as string) ?? "profile";

  const handleTabChange = (newTab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", newTab);

    router.push(`/mypage?${params.toString()}`);
  };
  const renderTabContent = () => {
    switch (tab) {
      case "profile":
        return <ProfileEdit />;
      case "reviews":
        return <MyReviews />;
      case "certificates":
        return <Certificates />;
      case "points":
        return <PointHistory />;
      case "mentor":
        return <MentorProfile />;
      default:
        return <ProfileEdit />;
    }
  };

  return (
    <RequireAuth>
      <MyPageLayout activeTab={tab} onTabChange={handleTabChange}>
        {renderTabContent()}
      </MyPageLayout>
    </RequireAuth>
  );
}
