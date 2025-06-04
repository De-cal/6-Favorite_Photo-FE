"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import close from "@/assets/icons/ic-close.svg";
import Card from "@/components/common/Card";
import SellPhotoCardDetailModal from "./SellPhotoCardDetailModal";
import { useModal } from "@/providers/ModalProvider";
import ExchangeInputModal from "../[id]/buyer/_components/modal/ExchangeInputModal";
import { getAllCards } from "@/lib/api/card.api";
import SortAndSearchSection from "@/app/my-gallery/_components/SortAndSearchSection";
import { useInfiniteQuery } from "@tanstack/react-query";
import { motion, useMotionValue } from "motion/react";
import clsx from "clsx";

function SelectPhotoCardsModal({ type = "판매", setIsModalOpen }) {
  const { openModal } = useModal();
  const scrollRef = useRef(null);
  const [isModalUp, setIsModalUp] = useState(false);
  const [isDragCloseModal, setIsDragCloseModal] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  const y = useMotionValue(0);
  const constraintsRef = useRef(null);

  // 모달 열릴 때 올라오는 애니메이션
  useEffect(() => {
    setIsModalUp(true);
    document.body.style.overflow = "hidden";
  }, []);

  // 모바일, 태블릿일 때만 드래그 디스 미스 활성화
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1479px)");

    const handleMediaChange = (e) => {
      setIsMobileOrTablet(e.matches);
    };

    setIsMobileOrTablet(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  // 정해진 위치만큼 드래그 하게되면 모달 자동 닫힘
  const handleDragEnd = () => {
    if (y.get() > 50) {
      setIsDragCloseModal(true);
    }
  };

  // 모달 내려가는 애니메이션 후, 닫기
  useEffect(() => {
    if (isDragCloseModal) {
      const timeout = setTimeout(() => {
        setIsModalOpen(false);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [isDragCloseModal]);

  const [searchFilter, setSearchFilter] = useState({
    keyword: "",
    rank: null,
    genre: null,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["cards", JSON.stringify(searchFilter)],
      queryFn: ({ pageParam = 1 }) =>
        getAllCards({
          ...searchFilter,
          page: pageParam,
          pageSize: 12,
        }),
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    });

  const allCards = data?.pages.flatMap((page) => page.list) || [];

  useEffect(() => {
    const target = scrollRef.current;
    if (!target) return;

    const handleScroll = () => {
      if (isFetchingNextPage || !hasNextPage) return;
      const { scrollTop, clientHeight, scrollHeight } = target;
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        fetchNextPage();
      }
    };

    target.addEventListener("scroll", handleScroll);
    return () => target.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClickOpenModal = (card) => {
    setIsModalOpen(false);
    if (type === "판매") {
      openModal(
        <SellPhotoCardDetailModal
          card={card}
          setIsModalOpen={setIsModalOpen}
        />,
      );
    } else {
      openModal(
        <ExchangeInputModal card={card} setIsModalOpen={setIsModalOpen} />,
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/80 pt-[60px] sm:pt-[40px] md:py-[40px]"
      onClick={() => setIsModalOpen(false)}
    >
      <motion.div
        ref={constraintsRef}
        drag={isMobileOrTablet && "y"}
        dragConstraints={{ top: 0, bottom: 300 }}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{ y }}
        className={clsx(
          isModalUp
            ? "translate-y-0 md:translate-none"
            : "translate-y-[100%] md:translate-none",
          isDragCloseModal && "translate-y-[100%] md:translate-none",
          "transition-transform duration-450 fixed w-full sm:bottom-0 md:max-w-[1160px] md:bottom-auto bg-gray-500 h-screen max-h-[1000px] rounded-xl overflow-hidden flex flex-col px-[15px] sm:px-[20px]",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-center mt-[15px]">
          <div className="bg-gray-400 w-[48px] h-[6px] md:hidden rounded-[50px]"></div>
        </div>
        {/* 닫기 버튼 */}
        <div className="flex justify-end w-full  mt-[30px] ">
          <button
            onClick={() => setIsModalOpen(false)}
            className="hidden md:block mr-[30px] cursor-pointer"
          >
            <Image src={close} alt="close" className="h-[32px]" />
          </button>
        </div>
        <div className="w-[345px] sm:w-[704px] md:w-[920px] mx-auto">
          <div className="text-gray-300 font-baskinRobbins text-[14px] sm:text-[16px] md:text-[24px]">
            마이갤러리
          </div>
          <div className="font-baskinRobbins text-[26px] sm:text-[40px] md:text-[46px] mt-[15px] sm:mt-[40px]">
            {type === "판매" ? "나의 포토카드 판매하기" : "포토카드 교환하기"}
          </div>
          <div className="hidden sm:block border-b-2 border-white mt-[20px]" />
          <div className="flex gap-[10px] w-full mt-[20px] sm:flex-row-reverse">
            <SortAndSearchSection
              data={allCards}
              onSearch={(filter) => setSearchFilter(filter)}
              selectedFilter={searchFilter}
            />
          </div>
          <div
            ref={scrollRef}
            className="md:absolute md:left-[50%] md:translate-x-[-50%] scrollbar overflow-y-auto overflow-x-hidden md:px-[20px] md:w-[960px] max-h-[800px] md:h-[600px] grid grid-cols-2 mt-[20px] sm:mt-[40px] gap-y-[5px] sm:gap-y-4 place-items-center gap-x-[5px] sm:gap-x-[20px] md:gap-x-[40px]"
          >
            {allCards.length === 0 && !isLoading ? (
              <div className="col-span-2 text-white text-center mt-[80px] text-[24px]">
                현재 보유 중인 포토카드가 없습니다
              </div>
            ) : (
              allCards.map((card) => (
                <Card
                  key={card.id}
                  onClick={() => handleClickOpenModal(card)}
                  type="my_card"
                  card={card}
                />
              ))
            )}

            {(isLoading || isFetchingNextPage) && (
              <div className="w-full flex justify-center items-center col-span-2 mt-[40px]">
                <div className="loader" />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default SelectPhotoCardsModal;
