import ActionButton from "@/components/ui/buttons/ActionButton";
import React from "react";

function TsetModal() {
  return (
    <div className="bg-red-300 text-main text-3xl w-100 h-150 items-center  text-center font-baskinRobbins opacity-85 pt-6 flex flex-col">
      테스트모달
      <div className="text-2xl font-notoSans text-black pt-10">
        어쩌구 저쩌구
      </div>
      <div className="text-2xl font-notoSans text-black pt-10">
        저쩌구 어쩌구
      </div>
      <div className="text-2xl font-notoSans text-black pt-10">
        어절씨구 어쩌구
      </div>
      <div className="text-2xl font-notoSans text-black pt-10">
        저절씨구 저쩌구
      </div>
      <div className="flex flex-row w-full justify-between px-10 pt-20">
        <ActionButton className=" w-30 h-10"> 버튼1 </ActionButton>
        <ActionButton className=" w-30 h-10"> 버튼1 </ActionButton>
      </div>
    </div>
  );
}
//프리티어
export default TsetModal;
