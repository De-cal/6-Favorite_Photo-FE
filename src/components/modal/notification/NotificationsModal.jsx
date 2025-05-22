import NotificationCard from "./NotificationCard";

function NotificationsModal({ notifications }) {
  return (
    <div>
      {notifications &&
        notifications.map((notification) => {
          return (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          );
        })}
    </div>
  );
}

export default NotificationsModal;
