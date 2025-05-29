import { readNotification } from "@/lib/api/notification.api";
import NotificationCard from "./NotificationCard";
import { useMutation } from "@tanstack/react-query";

function NotificationsModal({ notifications, refetchNotifications }) {
  const { mutate: mutateReadNotification } = useMutation({
    mutationFn: readNotification,
    onSuccess: () => {
      refetchNotifications();
    },
  });

  const handleReadNotification = (notificationId) => {
    mutateReadNotification(notificationId);
  };

  return (
    <div className="overflow-y-auto no-scrollbar h-[535px]">
      {notifications &&
        notifications.map((notification) => {
          return (
            <div
              key={notification.id}
              onClick={() => handleReadNotification(notification.id)}
            >
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            </div>
          );
        })}
    </div>
  );
}

export default NotificationsModal;
