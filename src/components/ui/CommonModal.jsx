"use client";

import Image from "next/image";
import React from "react";
import closebt from "../../assets/icons/ic-close.svg";
import mobileClosebt from "../../assets/icons/ic-back.svg";
import { useModal } from "@/providers/ModalProvider";
import { useRouter } from "next/navigation";

function CommonModal({ type, result, data }) {
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

  const router = useRouter();

  const getButtonText = () => {
    if (type === "포토카드 생성") {
      return result === "성공"
        ? "마이갤러리에서 확인하기"
        : "마이갤러리로 돌아가기";
    } else if (type === "교환 제시" || type === "판매 등록") {
      return result === "성공"
        ? "나의 판매 포토카드에서 확인하기"
        : "마켓플레이스로 돌아가기";
    } else if (type === "구매") {
      return result === "성공"
        ? "마이갤러리에서 확인하기"
        : "마켓플레이스로 돌아가기";
    }
    return "프롭스 타입이랑 리절트 다시 체크 부탁드려요"; // fallback
  };

  const { closeModal } = useModal();
  return (
    <div className="w-full h-screen flex sm:items-center justify-center bg-black text-white">
      <div className="w-full max-w-[920px]">
        <div className="relative w-full h-[60px] bg-black rounded-xl  flex flex-col items-center justify-center gap-6 mb-60 sm:mb-0 md:mb-0">
          {/* 모바일: 왼쪽 상단 < 닫기버튼*/}
          <button
            className="absolute left-5 top-1/2 -translate-y-1/2 sm:hidden"
            onClick={closeModal}
          >
            <Image
              src={mobileClosebt}
              width={18}
              height={18}
              alt="모바일 닫기"
            />
          </button>

          {/* 태블릿/pc: X 버튼*/}
          <div className="hidden sm:flex justify-end items-start w-[90%] md:w-full mb-20 ">
            <button onClick={closeModal}>
              <Image src={closebt} width={36} height={36} alt="PC 닫기" />
            </button>
          </div>
        </div>
        <div className="w-full  bg-black rounded-xl p-6 flex flex-col items-center gap-7.5 sm:gap-10">
          {/* 타이틀 */}
          <div className="text-3xl sm:text-[36px] font-bold text-center font-baskinRobbins">
            <span>{type}</span>{" "}
            <span className={result === "성공" ? "text-main" : "text-gray-400"}>
              {result}
            </span>
          </div>

          {/* 설명 */}
          <div className="w-full  text-center text-sm sm:text-base">
            {/* 모바일 (2줄 나눔) */}
            <div className="block sm:hidden leading-relaxed">
              {type === "포토카드 생성" || type === "교환 제시" ? (
                <>
                  <div>
                    [{data.rank} | {data.title}]
                  </div>
                  <div>{`${type}에 ${result}했습니다!`}</div>
                </>
              ) : (
                <>
                  <div>
                    [{data.rank} | {data.title}] {data.quantity}장
                  </div>
                  <div>{`${type}에 ${result}했습니다!`}</div>
                </>
              )}
            </div>

            {/* PC (한 줄 출력) */}
            <div className="hidden sm:block">
              {type === "교환 제시"
                ? `포토카드 교환 제시에 ${result}했습니다!`
                : type === "포토카드 생성"
                ? `[${data.rank} | ${data.title}] 포토카드 생성에 ${result}했습니다!`
                : `[${data.rank} | ${data.title}] ${data.quantity}장 ${type}에 ${result}했습니다!`}
            </div>
          </div>

          {/* 버튼 */}
          <button
            className="w-full max-w-[440px] h-[55px] sm:h-[60px] border border-white  text-white px-3 mt-5 sm:mt-6.5"
            onClick={() => {
              closeModal();
              if (type === "포토카드 생성") router.push("/my-gallery");
              else if (type === "교환 제시" || type === "판매 등록") {
                router.push(result === "성공" ? "/my-sell" : "/marketplace");
              } else if (type === "구매") {
                router.push(result === "성공" ? "/my-gallery" : "/marketplace");
              }
            }}
          >
            {getButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommonModal;
