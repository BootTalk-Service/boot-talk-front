"use client";

import { useEffect, useRef, useState } from "react";
import NotificationBell from "./NotificationBell";
import NotificationList from "./NotificationList";
import { useNotificationStore } from "@/store/notificationStore";
import { useInitialNotifications } from "@/hooks/notification/useInitialNotifications";
import { useNotificationEffect } from "@/hooks/notification/useNotificationEffect";
import { usePatchNotifications } from "@/hooks/notification/usePatchNotifications";
import { useQueryClient } from "@tanstack/react-query";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, setHasOpened, setNotifications } = useNotificationStore();

  const patchNotifications = usePatchNotifications();
  const queryClient = useQueryClient();

  useInitialNotifications(); // 초기 데이터 불러오기
  useNotificationEffect(); // SSE 실시간 수신

  const handleCloseDropdown = () => {
    setIsOpen(false);

    if (notifications.length > 0) {
      const latestTime = notifications[0].createdAt;

      patchNotifications.mutate(latestTime, {
        onSuccess: () => {
          //상태 업데이트
          const updated = notifications.map((n) =>
            n.createdAt <= latestTime ? { ...n, checked: true } : n
          );
          setNotifications(updated);

          queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      setHasOpened(true);
    }
  }, [isOpen, setHasOpened]);

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
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative z-[99]" ref={dropdownRef}>
      <div onClick={() => setIsOpen((prev) => !prev)}>
        <NotificationBell isActive={isOpen} />
      </div>

      {/* 드롭다운 */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 max-h-[400px] bg-white rounded-2xl shadow-2xl z-[50] overflow-y-auto scrollbar-thin pr-1">
          {/* 헤더 */}
          <div className="sticky top-0 p-4 text-lg font-bold text-left bg-gray-100 text-gray-700 border-b border-gray-300 z-10">
            알림
          </div>

          {/* 알림 리스트 */}
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
