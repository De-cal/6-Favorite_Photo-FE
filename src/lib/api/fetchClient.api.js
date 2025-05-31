const API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5050";

let isRefreshing = false;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export async function cookieFetch(path, options = {}, retry = true) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (response.status === 401 && retry) {
    if (isRefreshing) {
      await wait(500);
      return cookieFetch(path, options, false);
    }

    try {
      isRefreshing = true;

      const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
        cache: "no-store",
      });

      if (!refreshRes.ok) {
        throw new Error("서버에서 토큰 갱신 실패");
      }
      return cookieFetch(path, options, false);
    } catch (refreshError) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("unauthorized"));
      }
      throw new Error("세션이 만료되었습니다. 다시 로그인해주세요.");
    } finally {
      isRefreshing = false;
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "API 요청이 실패하였습니다");
  }

  return response.json();
}

export async function defaultFetch(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "API 요청이 실패하였습니다");
  }

  return response.json();
}
