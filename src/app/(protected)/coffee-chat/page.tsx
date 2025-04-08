"use client";

import CoffeeChatContainer from "@/components/coffee-chat/CoffeeChatContainer";
import { useAuthGuard } from "@/hooks/useAuthGuard";

const CoffeeChatPage = () => {
  const { user } = useAuthGuard();
  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto mt-5 p-4 min-h-screen">
      <CoffeeChatContainer />
    </div>
  );
};

export default CoffeeChatPage;
