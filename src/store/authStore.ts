import { create } from "zustand";
import type { AuthUser, UserInfo } from "@/types/response";

export const transformToAuthUser = (user: UserInfo): AuthUser => ({
  name: user.name,
  email: user.email,
  currentPoint: user.currentPoint,
  profileImage: user.profileImage,
  userId: user.userId,
});

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: AuthUser, token?: string) => void;
  logout: () => void;
  setUser: (user: AuthUser | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (user, token) => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled" && token) {
      localStorage.setItem("Authorization", token);
      localStorage.setItem("userId", String(user.userId));
    }
    set({ user, token: token || null, isAuthenticated: !!user });
  },

  logout: () => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      localStorage.removeItem("Authorization");
    }
    set({ user: null, token: null, isAuthenticated: false });
  },

  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },
}));
