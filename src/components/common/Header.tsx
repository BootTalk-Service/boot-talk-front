"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, MessageCircleCode } from "lucide-react";
import MobileDrawerMenu from "@/components/common/MobileDrawerMenu";
import { useDrawerScrollLock } from "@/hooks/useDrawerScrollLock";
import NotificationDropdown from "../notification/NotificationDropdown";
import { useUserStore } from "@/store/useUserStore";
import { useGetMyInfo } from "@/hooks/my-page/useGetMyInfo";
import { END_POINT } from "@/constants/endPoint";
import { axiosDefault } from "@/api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Header = () => {
  const { user, logout, isAuthenticated, setUser } = useUserStore();
  const queryClient = useQueryClient();

  useDrawerScrollLock();
  const userTextStyle = "text-sm font-medium";

  const { myInfo, isMyInfoLoading, isMyInfoError } = useGetMyInfo();

  useEffect(() => {
    if (myInfo && !isMyInfoLoading && !isMyInfoError) {
      setUser(myInfo);
    }
  }, [myInfo, isMyInfoLoading, isMyInfoError, setUser]);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await axiosDefault.post(END_POINT.LOGOUT);
    },
    onSuccess: () => {
      logout();
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
    onError: (error) => {
      console.error("로그아웃 실패:", error);
      toast.error("로그아웃 중 오류가 발생했습니다. 다시 시도해주세요");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

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
            {isAuthenticated && user ? (
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
                  {`${myInfo?.name}님`}
                </Link>

                <span className={userTextStyle}>{myInfo?.currentPoint}P</span>

                <button
                  className="btn bg-base-100 border-none text-sm hover:text-amber-950 transition-colors"
                  onClick={handleLogout}
                  disabled={isMyInfoLoading || isMyInfoError}
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
