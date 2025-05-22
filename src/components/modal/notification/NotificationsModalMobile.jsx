import { useModal } from "@/providers/ModalProvider";
import NotificationCard from "./NotificationCard";
import MobileHeader from "@/components/common/MobileHeader";

function NotificationsModalMobile({ notifications }) {
  const { closeModal } = useModal();

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-50 bg-black">
      <MobileHeader onClick={() => closeModal()} title={"알림"} />
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

export default NotificationsModalMobile;
