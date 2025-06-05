const API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5050";

let isRefreshing = false;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const cookieFetch = async (path, options = {}, retry = true) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (response.status === 401) {
    if (path === "/auth/login") {
      // 로그인 요청시 401 에러코드 받으면 비밀번호 불일치
      const errorData = await response.json();
      throw new Error(errorData.message || "로그인 정보가 올바르지 않습니다."); // 서버 메시지 사용
    }

    // 로그인 요청이 아닌경우 & 토큰 갱신 시도 되지 않은 경우 (access token이 만료됨)
    if (retry) {
      if (isRefreshing) {
        // 이미 다른 요청이 토큰 갱신 중이라면 대기
        await wait(500);
        return cookieFetch(path, options, false); // 대기 후 재시도 (재귀 호출 시 retry=false로 무한루프 방지)
      }

      try {
        isRefreshing = true;

        const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
          method: "POST",
          credentials: "include",
          cache: "no-store",
        });

        if (!refreshRes.ok) {
          // 리프레시 토큰 유효하지 않으므로 로그아웃
          throw new Error("서버에서 토큰 갱신 실패"); // 이 에러는 catch 블록으로 전달
        }
        // 토큰 갱신 성공, 원래 요청 다시 시도
        return cookieFetch(path, options, false);
      } catch (refreshError) {
        // 리프레시 토큰 갱신 실패 시 (세션 만료)
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("unauthorized"));
        }
        // 사용자에게 세션 만료 메시지 전달
        throw new Error("세션이 만료되었습니다. 다시 로그인해주세요.");
      } finally {
        isRefreshing = false;
      }
    } else {
      // 401 응답을 받았는데, 이미 토큰 갱신을 시도했고 (retry=false) 다른 예외적인 401인 경우
      const errorData = await response.json();
      throw new Error(errorData.message || "API 요청이 실패하였습니다. (401)");
    }
  }
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "API 요청이 실패하였습니다");
  }

  return response.json();
}

export const defaultFetch = async(path, options = {}) => {
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
