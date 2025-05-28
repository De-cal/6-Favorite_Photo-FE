export const getAllCards = async ({
  page,
  pageSize,
  rank,
  genre,
  keyword,
  status,
  userId = "01fe8f03-ab92-4616-a8ba-4cd9f5655112",
} = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", page);
    if (pageSize) queryParams.append("pageSize", pageSize);
    if (rank) queryParams.append("rank", rank);
    if (genre) queryParams.append("genre", genre);
    if (keyword) queryParams.append("keyword", keyword);
    if (status) queryParams.append("status", status);
    if (userId) queryParams.append("userId", userId);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/cards?${queryParams.toString()}`,
    );
    const data = await res.json();
    console.log("data", data);
    return data.list;
  } catch (error) {
    console.error("카드 목록을 가져오는데 실패했습니다:", error);
    throw error;
  }
};
