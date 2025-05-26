"use client";
import CommonModal from "@/components/common/CommonModal";
import SurprisePointModal from "@/components/modal/randomPoint/SurprisePointModal";
import { useModal } from "@/providers/ModalProvider";

export default function PointPage() {
  const data = { rank: "SuperRare", title: "스페인풍경", quantity: 2 };
  const { openModal } = useModal();
  return (
    <div className="flex flex-col items-center justify-center gap-40">
      <button
        onClick={() => {
          openModal(<CommonModal type="판매 등록" result="성공" data={data} />);
        }}
      >
        커먼모달 열기
      </button>
      <SurprisePointModal />
    </div>
  );
}
