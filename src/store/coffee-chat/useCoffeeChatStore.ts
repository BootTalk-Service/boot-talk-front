import { create } from "zustand";

export enum MainTab {
  FIND_MENTORS = "find-mentors",
  MY_CHATS = "my-chats",
}

export enum SubTab {
  LIST = "list",
  SENT = "sent",
  RECEIVED = "received",
  CONVERSATIONS = "conversations",
}

interface CoffeeChatState {
  mainTab: MainTab;
  subTab: SubTab;
  setMainTab: (tab: MainTab) => void;
  setSubTab: (tab: SubTab) => void;
  switchToFindMentors: () => void;
  switchToMyChats: () => void;
}

export const useCoffeeChatStore = create<CoffeeChatState>((set) => ({
  mainTab: MainTab.FIND_MENTORS,
  subTab: SubTab.LIST,
  setMainTab: (tab) => set({ mainTab: tab }),
  setSubTab: (tab) => set({ subTab: tab }),
  switchToFindMentors: () => set({ mainTab: MainTab.FIND_MENTORS }),
  switchToMyChats: () => {
    set({ mainTab: MainTab.MY_CHATS });
    set({ subTab: SubTab.LIST });
  },
}));
