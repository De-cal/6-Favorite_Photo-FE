import ActionButton from "@/components/ui/buttons/ActionButton";
import React from "react";

export default function LandingPage() {
  return (
    <>
      <h1>공용 컴포넌트 한눈에 보기</h1>
      <div className="bg-black flex flex-col gap-6">
        <h1>Landing Page</h1>
        <ActionButton variant="primary" label="포토카드 구매하기" />
        <ActionButton variant="primary" label="포토카드 교환하기" />
        <ActionButton variant="primary" label="포토카드 교환하기" disabled />
        <ActionButton variant="primary" label="승인" />

        <ActionButton variant="secondary" label="판매 내리기" />
        <ActionButton variant="secondary" label="포토카드 교환하기" />
        <ActionButton variant="secondary" label="거절" />
      </div>
    </>
  );
}
