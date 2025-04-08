import CoffeeChatHeader from "@/components/coffee-chat/CoffeeChatHeader";
import CoffeeChatTabNavigation from "@/components/coffee-chat/CoffeeChatTabNavigation";
import { ReactNode } from "react";

export default function CoffeeChatLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="bg-white p-4 rounded-lg">
      <CoffeeChatHeader />
      <CoffeeChatTabNavigation />
      {children}
    </div>
  );
}
