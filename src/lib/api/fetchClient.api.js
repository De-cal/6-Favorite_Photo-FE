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
