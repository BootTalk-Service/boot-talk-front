import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserStoreUser } from "@/types/user";

interface UserStore {
  user: UserStoreUser | null;
  setUser: (user: UserStoreUser) => void;
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
