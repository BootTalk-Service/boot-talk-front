import { useCoffeeChatStore } from "@/store/coffee-chat/useCoffeeChatStore";

const MyChatTabNavigation = () => {
  const { subTab, setSubTab } = useCoffeeChatStore();

  const tabs = [
    { id: "list", label: "커피챗 리스트" },
    { id: "sent", label: "보낸 신청" },
    { id: "received", label: "받은 신청" },
    { id: "conversations", label: "대화목록" },
  ];

  return (
    <div className="flex gap-2 mt-4 border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-4 py-2 ${
            subTab === tab.id
              ? "border-b-2 border-amber-950 text-amber-950 font-medium"
              : "text-gray-500"
          }`}
          onClick={() => setSubTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default MyChatTabNavigation;
