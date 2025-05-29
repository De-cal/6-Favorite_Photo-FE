const API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5050";

export async function cookieFetch(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include", // 쿠키 보내기 위한 설정 (access/refresh tokens)
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (response.status === 401 && retry) {
    // 리프레시 시도 중이면 기다렸다가 재시도
    if (isRefreshing) {
      await wait(500); // 짧게 기다리고 재시도
      return cookieFetch(path, options, false);
    }

    try {
      isRefreshing = true;
      const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      if (!refreshRes.ok) throw new Error("refresh token이 만료되었습니다.");

      // refreshToken 발급 받고 다시 cookieFetch 보냄
      return cookieFetch(path, options, false);
    } catch (refreshError) {
      // refreshToken 발급 실패하면 
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
