"use client";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { clearAuthStorage } from "@/lib/logout"

const MobileDrawerMenu = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    clearAuthStorage()
    window.location.href = "/";
  };

  const handleLinkClick = (path: string) => {
    const drawer = document.getElementById("mobile-drawer") as HTMLInputElement;
    if (drawer) drawer.checked = false;
    router.push(path);
  };

  return (
    <div className="menu p-4 w-64 min-h-full bg-base-100 text-base-content flex flex-col gap-4">
      {user ? (
        <>
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleLinkClick("/mypage")}
              className="flex items-center gap-1 hover:underline"
            >
              <span className="font-semibold">{user.name}님</span>
              <span className="text-sm text-amber-700">{user.current_point}P</span>
            </button>
            <button className="btn btn-ghost btn-circle">
              <Bell className="w-5 h-5" />
            </button>
          </div>

          {/* 로그인 상태일 때 */}
          <button
            onClick={() => handleLinkClick("/coffee-chat")}
            className="btn btn-outline btn-sm w-full"
          >
            커피챗 바로가기
          </button>

          {/* 로그아웃 */}
          <button onClick={handleLogout} className="btn btn-sm w-full">
            로그아웃
          </button>
        </>
      ) : (
        <Link href="/login" className="btn bg-white text-gray-600 border-gray-600 btn-sm w-full">
          로그인 / 회원가입
        </Link>
      )}
    </div>
  );
};

export default MobileDrawerMenu;
