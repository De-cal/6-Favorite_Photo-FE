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

  // 클라이언트에서 보낸 accessToken이 만료되었을시 401 코드를 받음
  if (response.status === 401 && retry) {
    // 리프레시 시도 중이면 기다렸다가 cookieFetch 다시 보낸다
    // (동시에 여러 요청에서 accessToken 에러 발생시 중복으로 refresh-token 엔드포인트로 요청 보내는것을 방지하기 위한 로직)
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

      if (!refreshRes.ok) throw new Error("서버에서 토큰 갱신 실패");

      // refreshToken 발급 받고 다시 cookieFetch 요청 보내기
      return cookieFetch(path, options, false);
    } catch (refreshError) {
      // refreshToken 발급 실패하면
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("unauthorized")); // AuthProvider에서 이거 감지하고 로그아웃 처리 하도록
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
