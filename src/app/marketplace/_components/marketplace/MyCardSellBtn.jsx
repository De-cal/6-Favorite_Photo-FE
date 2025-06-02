import React from "react";
import ActionButton from "@/components/ui/buttons/ActionButton";
import { getMe } from "@/lib/api/article.api";

export default function MyCardSellBtn({ onRequireLogin, setIsModalOpen }) {
  const handleCardClick = async () => {
    const user = await getMe();
    console.log("getMe", user);
    if (user) {
      setIsModalOpen(true); // 로그인 되어 있으면 SelectPhotoCardsModal 열기
    } else {
      onRequireLogin?.(); // 로그인 필요 시 로그인 모달 열기
    }
  };

  return (
    <div className="sm:hidden md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <ActionButton className="w-[342px] h-[60px]" onClick={handleCardClick}>
        나의 포토카드 판매하기
      </ActionButton>
    </div>
  );
}
