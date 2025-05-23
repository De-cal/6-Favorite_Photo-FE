"use client";

import React, { useEffect, useState } from "react";
import ic_alarm_default from "@/assets/icons/ic-alarm-default.svg";
import ic_alarm_active from "@/assets/icons/ic-alarm-active.svg";
import NotificationsModal from "./NotificationsModal";
import Image from "next/image";
import mock_data from "./mock_data.json";
import NotificationsModalMobile from "./NotificationsModalMobile";
import { useModal } from "@/providers/ModalProvider";

export default function Notification() {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  //TODO: 나중에 카운트 받아와서 null값으로 바꿔주기.
  const [notReadCount, setNotReadCount] = useState(1);
  const [notifications, setNotifications] = useState(mock_data);

  const [isMobile, setIsMobile] = useState(false);

  const { openModal } = useModal();

  // 알림 모달 토글.
  const handleNotificationModal = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
  };

  // 모바일 프로필 모달 열기
  const handleMobileModalOpen = () => {
    openModal(<NotificationsModalMobile notifications={notifications} />);
    setIsNotificationModalOpen(true);
  };

  // 알림 모달 닫기.
  const closeNotificationModal = () => {
    setIsNotificationModalOpen(false);
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

  // TODO: 알림 받아오는 로직(카운트 포함). (유즈이펙트) => 리액트 쿼리로 변경.
  useEffect(() => {}, []);

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
              <NotificationsModal notifications={notifications} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
