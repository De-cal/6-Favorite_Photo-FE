"use client";

import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { getMyNotifications, readNotification } from "@/lib/api/notification.api";
import NotificationCard from "./NotificationCard";
import { useRef, useCallback } from "react";

const LIMIT = 10;

function NotificationsModal({ refetchNotificationCount }) {
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
      refetch();
      if (refetchNotificationCount) refetchNotificationCount();
    },
  });

  const handleReadNotification = (notificationId) => {
    mutateReadNotification(notificationId);
  };

  return (
    <div className="overflow-y-auto no-scrollbar h-[535px]">
      {notifications.map((notification, index) => {
        const isLast = index === notifications.length - 1;
        return (
          <div
            key={notification.id}
            onClick={() => handleReadNotification(notification.id)}
            ref={isLast ? lastItemRef : null}
          >
            <NotificationCard notification={notification} />
          </div>
        );
      })}
      {isFetchingNextPage && (
        <div className="text-center py-2 text-sm text-gray-400">불러오는 중...</div>
      )}
    </div>
  );
}

export default NotificationsModal;
