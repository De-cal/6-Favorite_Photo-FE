"use client";

import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import {
  getMyNotifications,
  readNotification,
} from "@/lib/api/notification.api";
import NotificationCard from "./NotificationCard";
import { useRef, useCallback } from "react";

const LIMIT = 10;

export default function NotificationsModal({ refetchNotificationCount }) {
  const observerRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["notifications"],
      queryFn: ({ pageParam = 0 }) =>
        getMyNotifications({ pageParam, limit: LIMIT }),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.notifications.length < LIMIT
          ? undefined
          : allPages.length;
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
    [isFetchingNextPage, hasNextPage, fetchNextPage],
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
    <div className="overflow-y-auto no-scrollbar  bg-gray-500">
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-4 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <p>아직 알림이 없습니다</p>
        </div>
      ) : (
        <div className="h-[535px]">
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
        </div>
      )}
      {isFetchingNextPage && (
        <div className="text-center py-2 text-sm text-gray-400">
          불러오는 중...
        </div>
      )}
    </div>
  );
}
