import dateFormat from "@/lib/utils/dateFormat";

function NotificationCard({ notification }) {
  return (
    <div
      className={`flex flex-col border-b-1  bg-gray-500 p-5 gap-y-2 ${
        notification.isRead ? "brightness-50" : "border-gray-400 cursor-pointer"
      } `}
    >
      <p className="text-sm line-clamp-2">{notification.message}</p>
      <p
        className={`text-xs font-light ${
          notification.isRead ? "" : "text-gray-300"
        } `}
      >
        {dateFormat(notification.createdAt)}
      </p>
    </div>
  );
}

export default NotificationCard;
