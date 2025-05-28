export const getAllCards = async ({
  page,
  pageSize,
  rank,
  genre,
  keyword,
  status,
  includeZero,
} = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", page);
    if (pageSize) queryParams.append("pageSize", pageSize);
    if (rank) queryParams.append("rank", rank);
    if (genre) queryParams.append("genre", genre);
    if (keyword) queryParams.append("keyword", keyword);
    if (status) queryParams.append("status", status);
    if (includeZero) queryParams.append("includeZero", includeZero);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/cards?${queryParams.toString()}`,
    );
    const data = await res.json();
    return data.list;
  } catch (error) {
    console.error("카드 목록을 가져오는데 실패했습니다:", error);
    throw error;
  }
};

export const createCard = async (formData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cards`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("카드 생성에 실패했습니다.");
    }

    const data = await res.json();
    console.log("카드 생성 성공:", data);
    return data;
  } catch (error) {
    console.error("카드 생성 오류:", error);
    throw error;
  }
};
