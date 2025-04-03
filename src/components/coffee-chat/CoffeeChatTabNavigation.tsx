import {
  useCoffeeChatStore,
  MainTab,
} from "@/store/coffee-chat/useCoffeeChatStore";
import React from "react";

const CoffeeChatTabNavigation = () => {
  const { mainTab, switchToFindMentors, switchToMyChats } =
    useCoffeeChatStore();

  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
      <button
        className={`flex-1 py-2 px-4 rounded-md ${
          mainTab === MainTab.FIND_MENTORS
            ? "bg-white shadow-sm font-medium"
            : "text-gray-600 hover:bg-gray-200"
        }`}
        onClick={switchToFindMentors}
      >
        멘토 찾기
      </button>
      <button
        className={`flex-1 py-2 px-4 rounded-md ${
          mainTab === MainTab.MY_CHATS
            ? "bg-white shadow-sm font-medium"
            : "text-gray-600 hover:bg-gray-200"
        }`}
        onClick={switchToMyChats}
      >
        내 커피챗
      </button>
    </div>
  );
};

export default CoffeeChatTabNavigation;
