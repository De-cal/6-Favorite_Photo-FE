export const postPoint = async ({rewardPoints}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/points`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({rewardPoints}),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error("포인트 획득에 실패했습니다:", error);
    throw error;
  }
};