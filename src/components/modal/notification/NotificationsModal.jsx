import { readNotification } from "@/lib/api/notification.api";
import NotificationCard from "./NotificationCard";
import { useMutation } from "@tanstack/react-query";

function NotificationsModal({ notifications, lastItemRef, isFetchingNextPage, refetchNotifications }) {
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
    <div className="overflow-y-auto no-scrollbar h-[535px]">
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
export default NotificationsModal;
