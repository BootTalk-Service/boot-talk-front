import { create } from "zustand";

interface CoffeeChatState {
  mainTab: string;
  subTab: string;
  setMainTab: (tab: string) => void;
  setSubTab: (tab: string) => void;
  switchToFindMentors: () => void;
  switchToMyChats: () => void;
}

export const useCoffeeChatStore = create<CoffeeChatState>((set) => ({
  mainTab: "find-mentors",
  subTab: "list",
  setMainTab: (tab) => set({ mainTab: tab }),
  setSubTab: (tab) => set({ subTab: tab }),
  switchToFindMentors: () => set({ mainTab: "find-mentors" }),
  switchToMyChats: () => {
    set({ mainTab: "my-chats" });
    set({ subTab: "list" });
  },
}));
