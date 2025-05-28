import { cookieFetch } from "@/lib/api/fetchClient.api";

export async function getAllArticles(keyword) {
  try {
    const query = keyword ? `?keyword=${encodeURIComponent(keyword)}` : "";
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/articles${query}`,
    );
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    return error.message;
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

export const postArticle = async (articleData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
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
