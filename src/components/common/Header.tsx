"use client";

import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import Link from "next/link";
import { Bell, Menu } from "lucide-react";
import { clearAuthStorage } from "@/lib/logout";
import MobileDrawerMenu from "@/components/common/MobileDrawerMenu";
import { useDrawerScrollLock } from "@/hooks/useDrawerScrollLock";

const Header = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    clearAuthStorage();
  };
  
  const userTextStyle = "text-sm font-medium";
  useDrawerScrollLock();

  return (
    <>
    <input id="mobile-drawer" type="checkbox" className="drawer-toggle hidden" />
    <header className="bg-base-100 shadow-md">
      <div className="navbar container mx-auto px-4 relative justify-between">
        {/* 햄버거 (모바일) */}
        <div className="flex md:hidden items-center">
          <label htmlFor="mobile-drawer" className="btn btn-ghost">
            <Menu size={24} />
          </label>
        </div>

        {/* 로고 */}
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            <Image
              src="/logo.png"
              alt="로고"
              width={160}
              height={20}
              className="mr-2"
              priority
            />
          </Link>
        </div>

        {/* 로그인 상태 */}
        <div className="hidden md:flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <button className="btn btn-ghost btn-circle" aria-label="알림">
              <Bell />
            </button>
            
            <Link href="/mypage" className={userTextStyle}>
                {`${user.name}님`}
              </Link>
            
              <span className={userTextStyle}>{user.current_point}P</span>
            
            <button
              className="btn bg-base-100 border-none text-sm hover:text-amber-950 transition-colors"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  href="/login" 
                  className="btn bg-base-100 border-none text-sm hover:text-amber-950 transition-colors"
                >
                  로그인 / 회원가입
                </Link>
              </div>
            )}
          </div>
      </div>
    </header>

     {/* ✅ Drawer (모바일) */}
      <div className="drawer-side z-50 md:hidden fixed">
        <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
        <MobileDrawerMenu />
      </div>
    </>
  );
};

export default Header;
