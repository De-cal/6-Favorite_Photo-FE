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
    if (page) queryParams.append("page", page);
    if (pageSize) queryParams.append("pageSize", pageSize);
    if (rank) queryParams.append("rank", rank);
    if (genre) queryParams.append("genre", genre);
    if (keyword) queryParams.append("keyword", keyword);
    if (sellingType) queryParams.append("sellingType", sellingType);
    if (soldOut !== null && soldOut !== undefined)
      queryParams.append("soldOut", soldOut);

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
