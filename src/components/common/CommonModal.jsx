"use client";

import Image from "next/image";
import React from "react";
import closebt from "../../assets/icons/ic-close.svg";
import mobileClosebt from "../../assets/icons/ic-back.svg";
import { useModal } from "@/providers/ModalProvider";
import { useRouter } from "next/navigation";
import GradeDetail from "./GradeDetail";
import { useAuth } from "@/providers/AuthProvider";

export default function CommonModal({ type, result, data }) {
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

  const { getUser, refreshUser } = useAuth();
  const { closeModal } = useModal();

   const shouldRefreshUser = () => {
    return (
      (type === "포토카드 생성" && result === "성공")
    );
  };

  const handleUserRefresh = () => {
    if (shouldRefreshUser()) {
      // getUser 또는 refreshUser 중 하나 선택 (둘 다 있다면 refreshUser 권장)
      if (refreshUser) {
        refreshUser();
      } else {
        getUser();
      }
    }
  };


  return (
    <div className="fixed w-full h-screen inset-0 flex sm:items-center justify-center bg-black text-white">
      <div className="w-full max-w-[920px]">
        <div className="relative w-full h-[60px]  rounded-xl  flex flex-col items-center justify-center gap-6">
          {/* 모바일: 왼쪽 상단 < 닫기버튼*/}
          <button
            className="absolute left-5 top-1/2 -translate-y-1/2 sm:hidden cursor-pointer"
            onClick={() => {
              if (type === "구매" && result === "성공") {
                getUser();
              }
              closeModal();
              document.body.style.overflow = "auto";
            }}
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
            <button
              onClick={() => {
                if (type === "구매" && result === "성공") {
                  getUser();
                }
                closeModal();
                document.body.style.overflow = "auto";
              }}
              className="cursor-pointer"
            >
              <Image src={closebt} width={36} height={36} alt="PC 닫기" />
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="w-full max-w-[440px] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] sm:static sm:top-auto sm:left-auto sm:translate-y-0 sm:translate-x-0 rounded-xl py-6 px-[49px] sm:p-6 flex flex-col items-center justify-center gap-7.5 sm:gap-10">
            {/* 타이틀 */}
            <div className="text-3xl sm:text-[36px] font-bold text-center font-baskinRobbins">
              <span>{type}</span>{" "}
              <span
                className={result === "성공" ? "text-main" : "text-gray-400"}
              >
                {result}
              </span>
            </div>

            {/* 설명 */}
            <div className="w-full  text-center text-[16px]/[23px] md:text-[20px]/[29px]">
              {/* 모바일 (2줄 나눔) */}
              <div className="block sm:hidden leading-relaxed">
                {type === "포토카드 생성" || type === "교환 제시" ? (
                  <>
                    <div>
                      [
                      <GradeDetail
                        grade={data.rank}
                        className="text-[16px]/[23px] md:text-[20px]/[29px]"
                      />{" "}
                      | {data.title}]
                    </div>
                    <div>{`${type}에 ${result}했습니다!`}</div>
                  </>
                ) : (
                  <>
                    <div>
                      [
                      <GradeDetail
                        grade={data.rank}
                        className="text-[16px]/[23px] md:text-[20px]/[29px]"
                      />{" "}
                      | {data.title}]
                    </div>
                    <div>{`${data.quantity}장 ${type}에 ${result}했습니다!`}</div>
                  </>
                )}
              </div>

              {/* PC (한 줄 출력) */}
              <div className="hidden sm:block">
                {type === "교환 제시" ? (
                  <>포토카드 교환 제시에 {result}했습니다!</>
                ) : type === "포토카드 생성" ? (
                  <>
                    [
                    <GradeDetail
                      grade={data.rank}
                      className="text-[16px]/[23px] md:text-[20px]/[29px]"
                    />{" "}
                    | {data.title}] 포토카드 생성에 {result}했습니다!
                  </>
                ) : (
                  <>
                    [
                    <GradeDetail
                      grade={data.rank}
                      className="text-[16px]/[23px] md:text-[20px]/[29px]"
                    />{" "}
                    | {data.title}] {data.quantity}장 {type}에 {result}했습니다!
                  </>
                )}
              </div>
            </div>

            {/* 버튼 */}
            <button
              className="w-full max-w-[440px] h-[55px] sm:h-[60px] py-[18px] border border-white font-medium text-[16px]/[19px] text-white px-3 mt-5 sm:mt-6.5 md:text-[18px]/[22px] cursor-pointer"
              onClick={() => {
                if (type === "구매" && result === "성공") {
                  getUser();
                }
                handleUserRefresh();
                document.body.style.overflow = "auto";
                if (type === "포토카드 생성") router.push("/my-gallery");
                else if (type === "교환 제시" || type === "판매 등록") {
                  router.push(result === "성공" ? "/my-sell" : "/marketplace");
                } else if (type === "구매") {
                  router.push(
                    result === "성공" ? "/my-gallery" : "/marketplace",
                  );
                }
              }}
            >
              {getButtonText()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
