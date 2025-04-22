// components/feature/notification/NotificationDropdown.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import NotificationBell from "./NotificationBell";
import NotificationList from "./NotificationList";
import { useNotificationStore } from "@/store/notificationStore";
import { useInitialNotifications } from "@/hooks/notification/useInitialNotifications";
import { useNotificationEffect } from "@/hooks/notification/useNotificationEffect";
import { usePatchNotifications } from "@/hooks/notification/usePatchNotifications";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const notifications   = useNotificationStore((s) => s.notifications);
  const setHasOpened    = useNotificationStore((s) => s.setHasOpened);
  const setUnreadCount  = useNotificationStore((s) => s.setUnreadCount); // ← 가져오기

  const patchNotifications = usePatchNotifications();

  useInitialNotifications(); // 초기 데이터
  useNotificationEffect();   // SSE 실시간 구독

  // 드롭다운 닫을 때 서버에 확인 처리 요청
  const handleCloseDropdown = useCallback(() => {
    setIsOpen(false);
    if (notifications.length > 0) {
      patchNotifications.mutate();
    }
  }, [notifications, patchNotifications]);

  // 드롭다운 열고 닫기 감지
  useEffect(() => {
    if (isOpen) {
      setHasOpened(true);
      setUnreadCount(0);   // ← 열 때 카운트를 0으로 초기화
    }
  }, [isOpen, setHasOpened, setUnreadCount]);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        handleCloseDropdown();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleCloseDropdown]);

  return (
    <div className="relative z-[99]" ref={dropdownRef}>
      <div onClick={() => setIsOpen((prev) => !prev)}>
        <NotificationBell isActive={isOpen} />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 max-h-[400px] bg-white rounded-2xl shadow-2xl overflow-y-auto scrollbar-thin pr-1">
          <div className="sticky top-0 p-4 text-lg font-bold bg-gray-100 border-b">
            알림
          </div>
          <NotificationList
            notifications={notifications}
            onClose={handleCloseDropdown}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
