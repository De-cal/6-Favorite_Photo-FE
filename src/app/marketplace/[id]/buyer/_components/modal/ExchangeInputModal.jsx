"use client";

import Card from "@/components/common/Card";
import MobileHeader from "@/components/common/MobileHeader";
import ActionButton from "@/components/ui/buttons/ActionButton";
import { useModal } from "@/providers/ModalProvider";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ic_modal_close from "@/assets/icons/ic-modal-close.svg";
import ic_close_gray from "@/assets/icons/ic-close-gray.svg";
import Desktop from "@/components/common/Desktop";
import Tablet from "@/components/common/Tablet";
import { exchangeRequest } from "@/lib/api/article.api";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CommonModal from "@/components/common/CommonModal";
import clsx from "clsx";
import { motion, useMotionValue } from "motion/react";

export default function ExchangeInputModal({ card, setIsModalOpen }) {
  const [isModalUp, setIsModalUp] = useState(false);
  const [isDragCloseModal, setIsDragCloseModal] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [description, setDescription] = useState("");

  const { id: articleId } = useParams();
  const { closeModal, openModal } = useModal();
  const queryClient = useQueryClient();

  const y = useMotionValue(0);
  const constraintsRef = useRef(null);

  // 모달 열릴 때 올라오는 애니메이션
  useEffect(() => {
    setIsModalUp(true);
    // SelectPhotoCardsModal이 언마운트 되면서 클린업 함수로 스크롤이 생겨서 다시 재적용
    document.body.style.overflow = "hidden";
  }, []);

  // 태블릿일 때만 드래그 디스 미스 활성화
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 744px) and (max-width: 1479px)",
    );

    const handleMediaChange = (e) => {
      setIsTablet(e.matches);
    };

    setIsTablet(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  // 정해진 위치만큼 드래그 하게되면 모달 자동 닫힘
  const handleDragEnd = () => {
    if (y.get() > 100) {
      setIsDragCloseModal(true);
    }
  };

  // 모달 내려가는 애니메이션 후, 닫기
  useEffect(() => {
    if (isDragCloseModal) {
      const timeout = setTimeout(() => {
        closeModal();
        setIsModalOpen(true);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [isDragCloseModal]);

  // 교환 요청 API
  const { mutate: exchangeRequestMutate } = useMutation({
    mutationFn: ({ articleId, body }) =>
      exchangeRequest(articleId, body),
    onSuccess: () => {
      document.body.style.overflow = "hidden";
      openModal(
        <CommonModal
          type="교환 제시"
          result="성공"
          data={{ title: card.photoCard.title, rank: card.photoCard.rank }}
        />,
      );
      queryClient.invalidateQueries({ queryKey: ["articles", articleId] });
    },
    onError: () => {
      document.body.style.overflow = "hidden";
      openModal(
        <CommonModal
          type="교환 제시"
          result="실패"
          data={{ title: card.photoCard.title, rank: card.photoCard.rank }}
        />,
      );
    },
  });

  // 교환 요청하기
  const handleExchange = () => {
    exchangeRequestMutate({
      articleId,
      body: { userPhotoCardId: card.id, description },
    });
    closeModal();
    document.body.style.overflow = "auto";
  };

  // 뒤로가기
  const handleClose = () => {
    closeModal();
    setIsModalOpen(true);
    document.body.style.overflow = "auto";
  };

  // Description 변경
  const handleValue = (e) => {
    setDescription(e.target.value);
  };

  // 교환하기 버튼 활성화
  useEffect(() => {
    if (description.trim() === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [description]);

  return (
    <motion.div
      ref={constraintsRef}
      drag={isTablet && "y"}
      dragConstraints={{ top: 0, bottom: 300 }}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      style={{ y }}
      className={clsx(
        isModalUp
          ? "sm:translate-y-0 md:translate-none"
          : "sm:translate-y-[100%] md:translate-none",
        isDragCloseModal && "sm:translate-y-[100%] md:translate-none",
        "transition-transform duration-450 fixed inset-0 w-full overflow-y-auto pb-[20px] font-notoSans z-2 bg-black sm:w-full sm:max-w-[1480px] sm:px-[20px] sm:bg-gray-500 sm:fixed sm:top-auto md:static md:max-w-[1160px] md:pb-[60px] md:pt-[30px] md:px-[30px]",
      )}
    >
      <div className="flex justify-center items-center w-full">
        <div className="flex w-[345px]">
          <MobileHeader onClick={handleClose} title="포토카드 교환하기" />
        </div>
      </div>
      <Tablet>
        <div className="sm:flex sm:justify-center sm:items-center">
          <div className="relative w-[48px] h-[6px] mt-[15px]">
            <Image
              src={ic_modal_close}
              alt="닫기"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Tablet>
      <Desktop>
        <div className="md:flex md:justify-end md:items-center">
          <button
            onClick={handleClose}
            className="relative w-[32px] h-[32px] cursor-pointer"
          >
            <Image
              src={ic_close_gray}
              alt="닫기"
              fill
              className="object-cover"
            />
          </button>
        </div>
      </Desktop>
      <div className="flex flex-col justify-center items-center">
        <p className="hidden w-full max-w-[704px] font-baskinRobbins text-gray-300 mt-[30px] sm:block sm:font-normal sm:text-[16px]/[16px] md:text-[24px]/[25px] md:max-w-[920px] md:mt-0">
          포토카드 교환하기
        </p>
        <div className="flex flex-col justify-center items-center sm:max-w-[704px] md:max-w-[920px]">
          <div className="font-bold text-[24px]/[29px] w-full mt-[20px] mb-[26px] pb-[10px] border-b-[2px] border-gray-100 sm:text-[40px]/[41px] sm:mt-[40px] sm:mb-[40px] sm:pb-[20px] md:mb-[50px] md:text-[40px]/[48px]">
            {card.photoCard.title}
          </div>
          <div className="sm:flex justify-center w-full sm:gap-[20px] md:gap-[40px]">
            <Card type="exchange" card={card} />
            <div className="flex flex-col w-full max-w-[440px]">
              <div className="flex flex-col w-full justify-center items-start gap-y-[10px] mt-[26px] sm:mt-0">
                <p className="font-bold text-[16px]/[19px] sm:mt-0 md:text-[20px]/[24px]">
                  교환 제시 내용
                </p>
                <textarea
                  onChange={handleValue}
                  value={description}
                  className="font-normal text-[14px]/[17px] w-[345px] h-[140px] py-[12px] px-[20px] bg-gray-500 border rounded-[2px] border-gray-200 resize-none sm:w-full sm:max-w-[440px] sm:text-[16px]/[19px] md:py-[18px]"
                  placeholder="내용을 입력해주세요"
                />
              </div>
              <div className="flex justify-center items-center gap-[15px] mt-[44px] sm:gap-[20px] sm:mt-[60px]">
                <ActionButton
                  onClick={handleClose}
                  variant="secondary"
                  className="font-bold text-[16px]/[19px] w-full h-[55px] py-[18px] px-[51px] sm:px-[45px] md:h-[60px] md:text-[18px]/[22px] md:py-[19px] md:px-[69px]"
                >
                  취소하기
                </ActionButton>
                <ActionButton
                  onClick={handleExchange}
                  variant="primary"
                  disabled={isDisabled}
                  className="font-bold text-[16px]/[19px] w-full h-[55px] py-[18px] px-[52px] sm:px-[45px] md:h-[60px] md:text-[18px]/[22px] md:py-[19px] md:px-[69.5px]"
                >
                  교환하기
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
