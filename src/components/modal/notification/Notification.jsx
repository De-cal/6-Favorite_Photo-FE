"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import ic_alarm_default from "@/assets/icons/ic-alarm-default.svg";
import ic_alarm_active from "@/assets/icons/ic-alarm-active.svg";
import NotificationsModal from "./NotificationsModal";
import NotificationsModalMobile from "./NotificationsModalMobile";
import Image from "next/image";
import { useModal } from "@/providers/ModalProvider";
import { getMyNotifications } from "@/lib/api/notification.api";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function Notification({
  isNotificationModalOpen,
  setIsNotificationModalOpen,
  handleTabletAndDesktopModalClose,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const { openModal } = useModal();
  const observerRef = useRef(null);
  const LIMIT = 10;

  const {
    data: notificationData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch: refetchNotifications,
  } = useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: ({ pageParam  = 0 }) => getMyNotifications({ pageParam , limit: LIMIT }),
    getNextPageParam: (lastPage, allPages) => {
    const isLastPage = lastPage.notifications.length < LIMIT;
    return isLastPage ? undefined : allPages.length;
    },
    staleTime: 1000 * 60,
  });

  const notifications = notificationData?.pages.flatMap((page) => page.notifications) || [];
  const notReadCount = notificationData?.pages?.[0]?.unreadCount || 0;

  const lastItemRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  const handleNotificationModal = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
    handleTabletAndDesktopModalClose(false);
  };

  const handleMobileModalOpen = () => {
    openModal(
      <NotificationsModalMobile
        notifications={notifications}
        lastItemRef={lastItemRef}
        isFetchingNextPage={isFetchingNextPage}
        refetchNotifications={refetchNotifications}
      />
    );
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

  if (status === "loading") {
    return (
      <div className="relative w-[22px] h-[22px] sm:w-[24px] sm:h-[24px] cursor-pointer">
        <Image src={ic_alarm_default} alt="알림" fill />
      </div>
    );
  }

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

      {isNotificationModalOpen && !isMobile && (
        <div className="hidden sm:block absolute right-0 top-full w-[300px] h-auto z-50">
          <div className="flex flex-col p-4">
            <NotificationsModal
              notifications={notifications}
              lastItemRef={lastItemRef}
              isFetchingNextPage={isFetchingNextPage}
              refetchNotifications={refetchNotifications}
            />
          </div>
        </div>
      )}
    </div>
  );
}