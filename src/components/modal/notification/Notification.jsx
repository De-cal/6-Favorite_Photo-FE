"use client";

import React, { useEffect, useState } from "react";
import ic_alarm_default from "@/assets/icons/ic-alarm-default.svg";
import ic_alarm_active from "@/assets/icons/ic-alarm-active.svg";
import Image from "next/image";
import { useModal } from "@/providers/ModalProvider";
import NotificationsModal from "./NotificationsModal";
import NotificationsModalMobile from "./NotificationsModalMobile";
import { useQuery } from "@tanstack/react-query";
import { getMyNotifications } from "@/lib/api/notification.api";
import { usePathname } from "next/navigation";

export default function Notification({
  isNotificationModalOpen,
  setIsNotificationModalOpen,
  handleTabletAndDesktopModalClose,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const { openModal, closeModal } = useModal();
  const pathname = usePathname();

  const { data, refetch: refetchCount } = useQuery({
    queryKey: ["notificationsCount"],
    queryFn: () => getMyNotifications({ pageParam: 0, limit: 1 }),
    staleTime: 1000 * 60,
  });

  const notReadCount = data?.unreadCount || 0;

  const handleNotificationModal = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
    handleTabletAndDesktopModalClose(false);
  };

  const handleMobileModalOpen = () => {
    openModal(
      <NotificationsModalMobile refetchNotificationCount={refetchCount} />,
    );
    setIsNotificationModalOpen(true);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 744px)");

    const handleMediaChange = (e) => {
      if (e.matches) {
        setIsMobile(true);
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (isMobile && isNotificationModalOpen) {
      setIsNotificationModalOpen(false);
    }
  }, [isMobile, isNotificationModalOpen]);

  useEffect(() => {
    if (!isMobile) {
      closeModal();
    }
  }, [isMobile]);

  useEffect(() => {
    setIsNotificationModalOpen(false);
    closeModal();
  }, [pathname]);

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

      {!isMobile && isNotificationModalOpen && (
        <div className="hidden sm:block absolute right-0 top-full w-[300px] h-auto z-50">
          <div className="flex flex-col">
            <NotificationsModal refetchNotificationCount={refetchCount} />
          </div>
        </div>
      )}
    </div>
  );
}
