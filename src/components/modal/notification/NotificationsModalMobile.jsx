"use client";

import { useEffect, useRef, useCallback } from "react";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { getMyNotifications, readNotification } from "@/lib/api/notification.api";
import { useModal } from "@/providers/ModalProvider";
import MobileHeader from "@/components/common/MobileHeader";
import NotificationCard from "./NotificationCard";

const LIMIT = 10;

function NotificationsModalMobile({ refetchNotificationCount }) {
  const { closeModal } = useModal();
  const observerRef = useRef(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: ({ pageParam = 0 }) => getMyNotifications({ pageParam, limit: LIMIT }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.notifications.length < LIMIT ? undefined : allPages.length;
    },
    staleTime: 1000 * 60,
  });

  const notifications = data?.pages.flatMap((page) => page.notifications) || [];

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
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const { mutate: mutateReadNotification } = useMutation({
    mutationFn: readNotification,
    onSuccess: () => {
      refetch()
      if (refetchNotificationCount) refetchNotificationCount();
    }, 
  });

  const handleReadNotification = (notificationId) => {
    mutateReadNotification(notificationId);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-50 bg-black overflow-y-scroll">
      <div className="fixed w-full px-5 ">
        <MobileHeader onClick={closeModal} title={"알림"} />
      </div>
      <div className="mt-15">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            onClick={() => handleReadNotification(notification.id)}
            ref={index === notifications.length - 1 ? lastItemRef : null}
          >
            <NotificationCard notification={notification} />
          </div>
        ))}
      </div>
      {isFetchingNextPage && (
        <div className="text-center py-2 text-sm text-gray-400">불러오는 중...</div>
      )}
    </div>
  );
}

export default NotificationsModalMobile;
