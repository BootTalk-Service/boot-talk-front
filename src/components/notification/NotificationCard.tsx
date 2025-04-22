"use client";

import { useRouter } from "next/navigation";
import { NotificationItem } from "@/types/Notification";
import { useNotificationStore } from "@/store/notificationStore";
import { useMarkNotificationAsRead } from "@/hooks/notification/useMarkNotificationAsRead";

interface Props {
  notification: NotificationItem;
  onClose: () => void;
}

export default function NotificationCard({ notification, onClose }: Props) {
  const router = useRouter();
  const markAsReadById = useNotificationStore((s) => s.markAsReadById);
  const { mutate: markAsReadOnServer } = useMarkNotificationAsRead();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!notification.checked) {
      markAsReadById(notification.notificationId);
      markAsReadOnServer(notification.notificationId);
    }
    onClose();
    if (notification.url) {
      router.push(notification.url);
    }
  };

  const formattedDate = (() => {
    const dateStr = notification.createdAt;
    const datePart = dateStr.substring(0, 10).replace(/-/g, ".");
    const timePart = dateStr.substring(11, 16);
    return `${datePart} ${timePart}`;
  })();

  return (
    <div
      onClick={handleClick}
      className="p-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 hover:shadow transition relative cursor-pointer"
    >
      <p className="text-sm text-gray-800 font-medium text-left whitespace-pre-wrap">
        {notification.message}
      </p>
      {!notification.checked && (
        <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full" />
      )}
      <span className="text-xs text-gray-400 mt-2 block text-left">
        {formattedDate}
      </span>
    </div>
  );
}