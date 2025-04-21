import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserInfo } from "@/types/response";

interface UserStore {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        set({ user: null });
        localStorage.removeItem("access_token");
        localStorage.removeItem("auth-storage");
        localStorage.removeItem("user-storage");
      },
    }),
    {
      name: "user-storage",
    }
  )
);