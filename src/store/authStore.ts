import { create } from "zustand";
import { persist, createJSONStorage  } from "zustand/middleware";

type User = {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
  points?: number;
};

type AuthState = {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);