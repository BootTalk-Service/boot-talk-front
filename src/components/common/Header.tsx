"use client";

import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import Link from "next/link";
import { Menu, MessageCircleCode } from "lucide-react";
import { clearAuthStorage } from "@/lib/logout";
import MobileDrawerMenu from "@/components/common/MobileDrawerMenu";
import { useDrawerScrollLock } from "@/hooks/useDrawerScrollLock";
import NotificationDropdown from "../notification/NotificationDropdown";
import { useEffect, useState } from "react";
import { axiosDefault } from "@/api/axiosInstance";
import { END_POINT } from "@/constants/endPoint";

const Header = () => {
  const { user, logout, setUser } = useAuthStore();
  const [hasMounted, setHasMounted] = useState(false);

  const handleLogout = async () => {
    try {
      await axiosDefault.post(END_POINT.LOGOUT, {});
    } catch {}

    logout();
    clearAuthStorage();
  };

  useDrawerScrollLock();
  const userTextStyle = "text-sm font-medium";

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosDefault.get(END_POINT.MY_INFO);
        setUser(res.data);
      } catch {}
    };

    if (!user) {
      fetchUser();
    }
  }, [user, setUser]);

  if (!hasMounted) return null;

  return (
    <>
      <input
        id="mobile-drawer"
        type="checkbox"
        className="drawer-toggle hidden"
      />
      <header className="sticky top-0 z-60 shadow-m bg-base-100 shadow-md">
        <div className="navbar container mx-auto px-4 relative justify-between">
          <div className="flex md:hidden items-center">
            <label htmlFor="mobile-drawer" className="btn btn-ghost">
              <Menu size={24} />
            </label>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <Link href="/">
              <Image
                src="https://boottalk-bucket.s3.amazonaws.com/uploads/1745316038167_logo.PNG"
                alt="로고"
                width={160}
                height={20}
                priority
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <button
                    className="btn btn-ghost btn-circle"
                    aria-label="알림"
                  >
                    <NotificationDropdown />
                  </button>
                </div>

                <Link
                  href="/chat"
                  className="btn btn-ghost btn-circle"
                  aria-label="채팅"
                >
                  <MessageCircleCode />
                </Link>

                <Link
                  href="/mypage"
                  className={`${userTextStyle} hover:underline`}
                >
                  {`${user.name}님`}
                </Link>

                <span className={userTextStyle}>{user.currentPoint}P</span>

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

      <div className="drawer-side z-50 md:hidden fixed">
        <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
        <MobileDrawerMenu />
      </div>
    </>
  );
};

export default Header;
