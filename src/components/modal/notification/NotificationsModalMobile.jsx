"use client";

import { useModal } from "@/providers/ModalProvider";
import NotificationCard from "./NotificationCard";
import MobileHeader from "@/components/common/MobileHeader";
import { useMutation } from "@tanstack/react-query";
import { readNotification } from "@/lib/api/notification.api";

function NotificationsModalMobile({ notifications, lastItemRef, isFetchingNextPage, refetchNotifications }) {
  const { closeModal } = useModal();

  const { mutate: mutateReadNotification } = useMutation({
    mutationFn: readNotification,
    onSuccess: () => {
      if (refetchNotifications) refetchNotifications();
    },
  });

  const handleReadNotification = (notificationId) => {
    mutateReadNotification(notificationId);
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-50 bg-black overflow-y-auto">
      <MobileHeader onClick={closeModal} title={"알림"} />
      {notifications.map((notification, index) => {
        const isLast = index === notifications.length - 1;
        return (
          <div
            key={notification.id}
            onClick={() => handleReadNotification(notification.id)}
            ref={isLast ? lastItemRef : null}
          >
            <NotificationCard notification={notification} />
          </div>
        );
      })}
      {isFetchingNextPage && (
        <div className="text-center py-2 text-sm text-gray-400">불러오는 중...</div>
      )}
    </div>
  );
}

export default NotificationsModalMobile;
