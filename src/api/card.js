// src/api/card.js
export const getAllCards = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cards`);
    const data = await res.json();
    console.log("data", data);
    return data;
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
