import { useCoffeeChatStore } from "@/store/coffee-chat/useCoffeeChatStore";
import MyChatTabNavigation from "./MyChatTabNavigation";
import ReceivedListTab from "./ReceivedListTab";
import SentListTab from "./SentListTab";
import ChattingListTab from "./ChattingListTab";
import { FC, useMemo } from "react";
import { SubTab } from "@/store/coffee-chat/useCoffeeChatStore";
import ApprovedListTab from "./ApprovedListTab";

type TabComponents = Record<SubTab, FC>;

export default function MyChats() {
  const { subTab } = useCoffeeChatStore();

  // 활성화된 탭 컴포넌트만 렌더링하기 위한 맵
  const TabComponent: TabComponents = useMemo(
    () => ({
      [SubTab.LIST]: ApprovedListTab,
      [SubTab.SENT]: SentListTab,
      [SubTab.RECEIVED]: ReceivedListTab,
      [SubTab.CONVERSATIONS]: ChattingListTab,
    }),
    []
  );

  const CurrentTab = TabComponent[subTab];

  return (
    <div className="mt-4">
      <MyChatTabNavigation />
      <CurrentTab />
    </div>
  );
}
