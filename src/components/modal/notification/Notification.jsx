"use client";

import React, { useEffect, useState } from "react";
import ic_alarm_default from "@/assets/icons/ic-alarm-default.svg";
import ic_alarm_active from "@/assets/icons/ic-alarm-active.svg";
import NotificationsModal from "./NotificationsModal";
import Image from "next/image";
import NotificationsModalMobile from "./NotificationsModalMobile";
import { useModal } from "@/providers/ModalProvider";
import { getMyNotifications } from "@/lib/api/notification.api";
import { useQuery } from "@tanstack/react-query";

export default function Notification({
  isNotificationModalOpen,
  setIsNotificationModalOpen,
  handleTabletAndDesktopModalClose,
}) {
  const [isMobile, setIsMobile] = useState(false);

  const { openModal } = useModal();

  const {
    data: notificationData,
    isLoading,
    refetch: refetchNotifications,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getMyNotifications(),
    staleTime: 1000,
    cacheTime: 5 * 60 * 1000,
  });

  // 알림 모달 토글.
  const handleNotificationModal = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
    handleTabletAndDesktopModalClose(false);
  };

  // 모바일 프로필 모달 열기
  const handleMobileModalOpen = () => {
    openModal(<NotificationsModalMobile notifications={notifications} />);
    setIsNotificationModalOpen(true);
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 744);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="relative w-[22px] h-[22px] sm:w-[24px] sm:h-[24px] cursor-pointer">
        <Image src={ic_alarm_default} alt="알림" fill />
      </div>
    );
  }

  const notifications = notificationData.notifications;
  const notReadCount = notificationData.unreadCount;
  console.log(notReadCount);

  return (
    <div className="relative">
      <button
        onClick={isMobile ? handleMobileModalOpen : handleNotificationModal}
        className="w-[22px] h-[22px] sm:w-[24px] sm:h-[24px] cursor-pointer"
      >
        <Image
          src={notReadCount > 0 ? ic_alarm_active : ic_alarm_default}
          alt="알림"
          fill
        />
      </button>

      {isNotificationModalOpen && (
        <>
          <div className="hidden sm:block absolute right-0 top-full w-[300px] h-auto z-50">
            <div className="flex flex-col p-4">
              <NotificationsModal
                notifications={notifications}
                refetchNotifications={refetchNotifications}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
