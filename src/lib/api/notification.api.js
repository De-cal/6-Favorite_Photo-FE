import { cookieFetch } from "./fetchClient.api";

// 알림 가져오기 api.
export const getMyNotifications = async ({ pageParam  = 0, limit = 10 }) => {
  try {
    const res = await cookieFetch(`/notifications?page=${pageParam }&limit=${limit}`, {
      method: "GET",
    });
    if (!res) {
      throw new Error(data.message || "알 수 없는 서버 에러가 발생했습니다.");
    }
    return res;
  } catch (error) {
    console.error("알림 목록을 가져오는데 실패했습니다:", error);
    throw error;
  }
};

// 읽음처리 api.
export const readNotification = async (notificationId) => {
  try {
    const res = await cookieFetch(`/notifications/${notificationId}/read`, {
      method: "PATCH",
    });
    if (!res) {
      throw new Error(data.message);
    }
    return res;
  } catch (error) {
    console.error("읽음 처리 하는데 실패했습니다:", error);
    throw error;
  }
};
