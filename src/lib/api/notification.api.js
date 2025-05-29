import { cookieFetch } from "./fetchClient.api";

// 알림 가져오기 api.
export const getMyNotifications = async () => {
  try {
    const res = await cookieFetch("/notifications", {
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
    
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error("읽음 처리 하는데 실패했습니다:", error);
    throw error;
  }
};

// 테스트용 생성 api.
export const createNotification1 = async () => {
  try {
    const res = await cookieFetch("/notifications/create-1", {
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

export const createNotification2 = async () => {
  try {
    const res = await cookieFetch("/notifications/create-2", {
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

export const createNotification3 = async () => {
  try {
    const res = await cookieFetch("/notifications/create-3", {
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

export const createNotification4 = async () => {
  try {
    const res = await cookieFetch("/notifications/create-4", {
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

export const createNotification5 = async () => {
  try {
    const res = await cookieFetch("/notifications/create-5", {
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
