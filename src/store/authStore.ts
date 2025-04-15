import { create } from "zustand";
import type { AuthUser, UserStoreUser } from "@/types/user";

export const transformToAuthUser = (user: UserStoreUser): AuthUser => ({
  id: user.t_user_id,
  name: user.name,
  email: user.email,
  current_point: user.current_point,
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
