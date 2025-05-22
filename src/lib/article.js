export const getAllArticles = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/articles`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("아티클 목록을 가져오는데 실패했습니다:", error);
    throw error;
  }
};

export const postArticle = async (articleData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/arciles`, {
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
