"use client";

import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import Link from "next/link";
import { Bell, Menu } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };


  return (
    <header className="bg-base-100 shadow-md">
      <div className="navbar container mx-auto px-4 relative justify-between">
        {/* 햄버거 (모바일 전용) */}
        <div className="flex md:hidden items-center">
          <button className="btn btn-ghost">
            <Menu size={24} />
          </button>
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
        <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <button className="btn btn-ghost btn-circle">
              <Bell className="text-amber-950"/>
            </button>

            {/* <Image
              src={user.avatarUrl || "/profile-default.png"}
              alt="프로필"
              width={36}
              height={36}
              className="rounded-full"
            /> */}
            
            <Link href="/mypage" className="text-sm font-medium hover:underline">
              <span className="text-amber-950 text-sm font-medium">{`${user.name}님`}</span>
            </Link>
            
            <span className="text-amber-950 text-sm">{`${user.points}P`}</span>
            
            <button
              className="btn bg-base-100 border-none text-amber-950 text-sm hover:text-amber-900 transition-colors"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  href="/login" 
                  className="btn bg-base-100 border-none text-amber-950 text-sm hover:text-amber-900 transition-colors"
                >
                  로그인 / 회원가입
                </Link>
              </div>
            )}
          </div>
      </div>
    </header>
  );
};

export default Header;
