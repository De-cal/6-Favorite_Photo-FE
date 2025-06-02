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
    console.log(data);
    return data;
  } catch (error) {
    console.error("getAllArticles error:", error);
    return { articles: [], totalPages: 1 };
  }
}

export const getUserArticles = async ({
  page,
  pageSize,
  rank,
  genre,
  keyword,
  sellingType,
  soldOut,
} = {}) => {
  try {
    const queryParams = new URLSearchParams();

    if (page) queryParams.set("page", String(page));
    if (pageSize) queryParams.set("pageSize", String(pageSize));
    if (rank) queryParams.set("rank", rank);
    if (genre) queryParams.set("genre", genre);
    if (keyword) queryParams.set("keyword", keyword);
    if (sellingType) queryParams.set("sellingType", sellingType);
    if (soldOut !== undefined) queryParams.set("soldOut", String(soldOut));

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
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${articleId}`,
    // );

    // if (!response.ok) {
    //   throw new Error("Failed to fetch article");
    // }

    // const data = await response.json();
    // return data;
    return await cookieFetch(`/articles/${articleId}/seller`);
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
    const data = await cookieFetch(`/articles`, {
      method: "POST",
      body: JSON.stringify(articleData),
    });

    return data;
  } catch (error) {
    console.error("판매 등록에 실패했습니다:", error);
    throw error;
  }
};

// 포토카드 구매자 상세 불러오기
const getArticle = async (articleId) => {
  try {
    return await cookieFetch(`/articles/${articleId}/buyer`);
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
    throw e;
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
    throw e;
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

//포토카드 교환 요청 승인 거절
const exchangeApprove = async (articleId, exchangeId) => {
  try {
    return await cookieFetch(`articles/${articleId}/exchange/${exchangeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isApproved }),
    });
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

//아티클 수정
const patchArticle = async (articleId, data) => {
  try {
    return await cookieFetch(`/articles/${articleId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.error(e.message);
  }
};

export default {
  getArticle,
  purchaseArticle,
  exchangeRequest,
  exchangeApprove,
  cancelExchangeRequest,
  patchArticle,
};
