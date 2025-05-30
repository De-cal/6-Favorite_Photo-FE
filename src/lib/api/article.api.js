import { cookieFetch } from "@/lib/api/fetchClient.api";

export async function getAllArticles(page = 1, limit = 12, keyword = "") {
  try {
    const query =
      `?page=${page}&limit=${limit}` +
      (keyword ? `&keyword=${encodeURIComponent(keyword)}` : "");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/articles${query}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }

    const data = await response.json(); // { articles: [], totalPages, currentPage }
    console.log(data);
    return data;
  } catch (error) {
    console.error("getAllArticles error:", error);
    return { articles: [], totalPages: 1 };
  }
}
export async function getMe() {
  try {
    const user = await cookieFetch("/auth/me", {
      method: "GET",
      credentials: "include", // 꼭 필요!
    });

    if (!user) return null;

    return { data: user }; // 이렇게 감싸야 destructuring 가능
  } catch (error) {
    console.error("getMe() 오류:", error);
    return null;
  }
}

export const getUserArticles = async ({} = {}) => {
  try {
    const queryParams = new URLSearchParams();

    const data = await cookieFetch(`/articles/user?${queryParams.toString()}`);

    return data;
  } catch (error) {
    console.error("아티클 목록을 가져오는데 실패했습니다:", error);
    throw error;
  }
};

export const postArticle = async (articleData) => {
  try {
    const res = await cookieFetch(`/articles`, {
      method: "POST",
      body: JSON.stringify(articleData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error("판매 등록에 실패했습니다:", error);
    throw error;
  }
};
