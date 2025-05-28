import React from "react";
import DetailCard from "./DetailCard";
import SellerCardInfo from "./SellerCardInfo";
function ExchangeCards() {
  const cardArticle = {
    id: "99a8250a-344f-496f-a2cc-3bd13260b555",
    createdAt: "2025-05-27T08:39:08.424Z",
    photoCardId: "a5ace78b-57b1-4bf1-a4a7-d34f4c4133f1",
    userId: "340ae5e1-e1a6-4482-aed9-d3ca1a31ef95",
    price: 200,
    quantity: 1,
    status: "SELLING",
    // 연관된 포토카드 정보
    photoCard: {
      id: "a5ace78b-57b1-4bf1-a4a7-d34f4c4133f1",
      title: "남자 모델",
      description: "남자 모델을(를) 담은 감성적인 포토카드입니다. 고화질 인쇄로 생생한 느낌을 제공합니다.",
      rank: "RARE",
      genre: "PORTRAIT",
    },
    // 판매자 정보
    user: {
      id: "340ae5e1-e1a6-4482-aed9-d3ca1a31ef95",
      nickname: "최민경",
    },
  };

  return (
    <div className="w-[345px] sm:w-full md:w-full mx-auto max-w-[1480px]">
      <h1 className="w-full text-xl sm:text-2xl font-bold mb-4 sm:mb-6 border-b border-gray-100 pb-2">
        교환 제시 목록
      </h1>
      <div className="flex flex-col gap-[40px]">
        {/* 판매자 카드 */}
        <div className="flex gap-[5px] sm:gap-[20px] md:gap-[80px]">
          <DetailCard
            card={{
              name: cardArticle.photoCard.title,
              rank: cardArticle.photoCard.rank,
              genre: cardArticle.photoCard.genre,
              owner: cardArticle.user.nickname,
              price: cardArticle.price,
              quantity: cardArticle.quantity,
              totalQuantity: cardArticle.totalQuantity || 1,
              status: cardArticle.status,
              image: "", // 이미지가 있다면 여기에 URL
            }}
          />
        </div>
        {/* <SellerCardInfo cardArticle={cardArticle} /> */}
        {/* 교환제시목록에 뜰 내용들 디테일카드에 들어가야 함 */}
      </div>
    </div>
  );
}
export default ExchangeCards;
