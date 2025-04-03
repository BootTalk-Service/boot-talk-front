"use client";

import Certificates from "@/components/mypage/Certificates";
import MyPageLayout from "@/components/mypage/MyPageLayout";
import MyReviews from "@/components/mypage/MyReviews";
import PointHistory from "@/components/mypage/PointHistory";
import ProfileEdit from "@/components/mypage/ProfileEdit";
import RequireAuth from "@/components/common/RequireAuth";
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
