import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Bootcamp } from "@/types/Bootcamp";

export interface User {
  t_user_id: number;
  name: string;
  email: string;
  profile_image: string;
  desired_career: string;
  current_point: number;
  bootcamps: Bootcamp[];
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
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
      // localStorage key
      name: "user-storage", 
    }
  )
);
