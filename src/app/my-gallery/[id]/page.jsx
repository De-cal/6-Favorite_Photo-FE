import MobileHeader from "@/components/common/MobileHeader";
import React from "react";
import TopTitle from "./_components/TopTitle";
import CardInfo from "./_components/CardInfo";

export default function MyGalleryDetailPage() {
  const data = {
    photoCard: {
      title: "거리를 걷는 남자",
      rank: "LEGENDARY",
      description:
        "흐릿한 오후, 거리를 유유자적하게 걷는 중년 남성의 아름다운 뒷태가 담긴 사진입니다.",
      genre: "PORTRAIT",
      imgURL: "",
      creator: { nickname: "김숲안" },
    },
    price: 10,
    quantity: 1,
    status: "SELLING",
    totalQuantity: 5,
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center max-w-[1480px] sm:px-5 mx-auto mt-[20px] px-5 gap-5">
        <MobileHeader title="마이갤러리 상세 페이지" src="/my-gallery" />
        <TopTitle data={data} />
        <CardInfo data={data} />
      </div>
    </>
  );
}
