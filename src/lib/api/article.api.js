import { cookieFetch, defaultFetch } from "./fetchClient.api";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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

// 특정 아티클 상세 정보 가져오기
export async function getArticleById(articleId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${articleId}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch article");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("getArticleById error:", error);
    throw error;
  }
}

// 아티클 삭제 (판매 내리기)
export async function deleteArticle(articleId) {
  try {
    const data = await cookieFetch(`/articles/${articleId}`, {
      method: "DELETE",
    });
    
    return data;
  } catch (error) {
    console.error("아티클 삭제에 실패했습니다:", error);
    throw error;
  }
}

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

// 포토카드 상세 불러오기
const getArticle = async (articleId) => {
  try {
    return await cookieFetch(`/articles/${articleId}`);
  } catch (e) {
    console.error(e.message);
  }
};

// 포토카드 구매
const purchaseArticle = async (articleId, body) => {
  try {
    return await cookieFetch(`/articles/${articleId}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  } catch (e) {
    console.error(e.message);
  }
};

// 포토카드 교환 요청
const exchangeRequest = async (articleId, body) => {
  try {
    return await cookieFetch(`/articles/${articleId}/exchange`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  } catch (e) {
    console.error(e.message);
  }
};

// 포토카드 교환 요청 취소
const cancelExchangeRequest = async (
  articleId,
  exchangeId,
  requesterCardId,
) => {
  try {
    return await cookieFetch(
      `/articles/${articleId}/exchange/${exchangeId}/${requesterCardId}`,
      { method: "DELETE" },
    );
  } catch (e) {
    console.error(e.message);
  }
};

export default {
  getArticle,
  purchaseArticle,
  exchangeRequest,
  cancelExchangeRequest,
};
