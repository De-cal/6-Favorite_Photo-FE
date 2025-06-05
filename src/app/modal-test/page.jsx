"use client";
import CommonModal from "@/components/common/CommonModal";
import MobileHeader from "@/components/common/MobileHeader";
import { useModal } from "@/providers/ModalProvider";
import React, { useEffect } from "react";
import TsetModal from "./TsetModal";

function modalTestPage() {
  // type => 판매 등록 , 교환 제시, 구매, 포토카드 생성 (띄어쓰기 그대로 4가지)
  // result => 성공 실패 (한글로 2가지 뿐)
  // data => 교환 제시, 포토카드 생성 => rank, title 필요
  // data => 판매 등록, 구매 => rank, title, quantity 필요
  //
  // 그 외 모달프로바이더 관련 사항
  // import { openModal, useModal } from "@/providers/ModalProvider";
  // const { openModal, closeModal } = useModal();
  // 임포트+선언 하고 onClick={()=>openModal(<본인 모달/>)} 로 사용가능
  // 모달 내부에서 onClick={closeModal} 혹은 onClick={closeModal()} 로 닫기 가능
  // 화면 가운데 띄우는 모달만 가능 판다마켓 수정하기,삭제하기 같은 버튼 바로아래 모달은 X

  const { openModal } = useModal();

  const data = { rank: "SuperRare", title: "스페인풍경", quantity: 2 };
  return (
    <div className="flex flex-col items-center justify-center gap-15">
      <MobileHeader title="나의 포토카드 판매 상세 페이지" />
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-3xl ">판매 등록 성공 실패</h1>
        <div className="flex flex-row justify-between items-center gap-10">
          <button
            className="bg-main w-20 h-10 rounded-3xl text-gray-300 text-[20px]"
            onClick={() =>
              openModal(
                <CommonModal type="판매 등록" result="성공" data={data} />,
              )
            }
          >
            성공
          </button>
          <button
            className="bg-main w-20 h-10 rounded-3xl text-gray-300 text-[20px]"
            onClick={() =>
              openModal(
                <CommonModal type="판매 등록" result="실패" data={data} />,
              )
            }
          >
            실패
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-3xl ">구매 성공 실패</h1>
        <div className="flex flex-row justify-between items-center gap-10">
          <button
            className="bg-main w-20 h-10 rounded-3xl text-gray-300 text-[20px]"
            onClick={() =>
              openModal(<CommonModal type="구매" result="성공" data={data} />)
            }
          >
            성공
          </button>
          <button
            className="bg-main w-20 h-10 rounded-3xl text-gray-300 text-[20px]"
            onClick={() =>
              openModal(<CommonModal type="구매" result="실패" data={data} />)
            }
          >
            실패
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-3xl ">교환 성공 실패</h1>
        <div className="flex flex-row justify-between items-center gap-10">
          <button
            className="bg-main w-20 h-10 rounded-3xl text-gray-300 text-[20px]"
            onClick={() =>
              openModal(
                <CommonModal type="교환 제시" result="성공" data={data} />,
              )
            }
          >
            성공
          </button>
          <button
            className="bg-main w-20 h-10 rounded-3xl text-gray-300 text-[20px]"
            onClick={() =>
              openModal(
                <CommonModal type="교환 제시" result="실패" data={data} />,
              )
            }
          >
            실패
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-3xl ">생성 성공 실패</h1>
        <div className="flex flex-row justify-between items-center gap-10">
          <button
            className="bg-main w-20 h-10 rounded-3xl text-gray-300 text-[20px]"
            onClick={() =>
              openModal(
                <CommonModal type="포토카드 생성" result="성공" data={data} />,
              )
            }
          >
            성공
          </button>
          <button
            className="bg-main w-20 h-10 rounded-3xl text-gray-300 text-[20px]"
            onClick={() =>
              openModal(
                <CommonModal type="포토카드 생성" result="성공" data={data} />,
              )
            }
          >
            실패
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-3xl ">재욱님 모달 테스트 버튼</h1>
        <div className="flex flex-row justify-between items-center gap-10">
          <button
            className="bg-main w-60 h-20 rounded-3xl text-gray-300 text-[20px]"
            onClick={() => {
              openModal(
                <CommonModal type="포토카드 생성" result="성공" data={data} />,
                "center",
                "center",
              );
              openModal(<TsetModal />, "bottom", "center", true);
            }}
          >
            모달 2개 뜨는거 테스트
          </button>
        </div>
      </div>
    </div>
  );
}

export default modalTestPage;
