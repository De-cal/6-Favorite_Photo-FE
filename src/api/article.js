export async function getAllArticles(keyword) {
  try {
    const query = keyword ? `?keyword=${encodeURIComponent(keyword)}` : "";
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/articles${query}`);
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    return error.message;
  }
}

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
