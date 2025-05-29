import { cookieFetch } from "@/lib/api/fetchClient.api";

export const postPoint = async (rewardPoints) => {
  try {
    const res = await cookieFetch("/points", {
      method: "POST",
      body: JSON.stringify({ rewardPoints }),
    });
    if (!res) {
      throw new Error(data.message || "알 수 없는 서버 에러가 발생했습니다.");
    }
    return res;
  } catch (error) {
    console.error("포인트 획득 API 호출 중 실패했습니다:", error);
    throw error;
  }
};
