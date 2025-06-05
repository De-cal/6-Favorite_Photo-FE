import { cookieFetch } from "@/lib/api/fetchClient.api";

export const getAllCards = async ({
  page,
  pageSize,
  rank,
  genre,
  keyword,
  status,
} = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", page);
    if (pageSize) queryParams.append("pageSize", pageSize);
    if (rank) queryParams.append("rank", rank);
    if (genre) queryParams.append("genre", genre);
    if (keyword) queryParams.append("keyword", keyword);
    if (status) queryParams.append("status", status);

    // 쿠키에 있는 accessToken 자동 전송
    const data = await cookieFetch(`/cards?${queryParams.toString()}`);

    return data;
  } catch (error) {
    console.error("카드 목록을 가져오는데 실패했습니다:", error);
    throw error;
  }
};

export const createCard = async (formData) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cards`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("카드 생성에 실패했습니다.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("카드 생성 오류:", error);
    throw error;
  }
};
