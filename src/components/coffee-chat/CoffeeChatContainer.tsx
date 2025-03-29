"use client";

import React from "react";
import FindMentors from "./FindMentors";
import MyChats from "./MyChats";
import CoffeeChatHeader from "./CoffeeChatHeader";
import { useCoffeeChatStore } from "@/store/coffee-chat/useCoffeeChatStore";
import CoffeeChatTabNavigation from "./CoffeeChatTabNavigation";

const CoffeeChatContainer = () => {
  const mainTab = useCoffeeChatStore((state) => state.mainTab);

  const renderMainContent = () => {
    if (mainTab === "find-mentors") {
      return <FindMentors />;
    } else if (mainTab === "my-chats") {
      return <MyChats />;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg ">
      {/* 헤더 섹션 */}
      <CoffeeChatHeader />

      {/* 메인 탭 네비게이션 */}
      <CoffeeChatTabNavigation />

      {/* 컨텐츠 영역 */}
      {renderMainContent()}
    </div>
  );
};

export default CoffeeChatContainer;
