"use client";

import RequireAuth from "@/components/common/RequireAuth";
import Certificates from "@/components/feature/mypage/Certificates";
import MyPageLayout from "@/components/feature/mypage/MyPageLayout";
import MyReviews from "@/components/feature/mypage/MyReviews";
import PointHistory from "@/components/feature/mypage/PointHistory";
import ProfileEdit from "@/components/feature/mypage/ProfileEdit";
import { useState } from "react";

export default function Mypage() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileEdit />;
      case "reviews":
        return <MyReviews />;
      case "certificates":
        return <Certificates />;
      case "points":
        return <PointHistory />;
      default:
        return <ProfileEdit />;
    }
  };

  return (
    <RequireAuth>
      <MyPageLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderTabContent()}
      </MyPageLayout>
    </RequireAuth>
  );
}
