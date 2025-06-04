import React from "react";
import ActionButton from "@/components/ui/buttons/ActionButton";
import { useAuth } from "@/providers/AuthProvider";

export default function MyCardSellBtn({ onRequireLogin, setIsModalOpen }) {
  const { user } = useAuth();
  const handleCardClick = async () => {
    if (user) {
      setIsModalOpen(true);
    } else {
      onRequireLogin?.();
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
