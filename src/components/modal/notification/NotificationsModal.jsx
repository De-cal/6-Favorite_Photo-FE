import NotificationCard from "./NotificationCard";

function NotificationsModal({ notifications }) {
  return (
    <div className="overflow-y-auto no-scrollbar h-[535px]">
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
