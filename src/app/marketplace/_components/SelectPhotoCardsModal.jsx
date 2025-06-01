"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import close from "@/assets/icons/ic-close.svg";
import Card from "@/components/common/Card";
import SellPhotoCardDetailModal from "./SellPhotoCardDetailModal";
import { useModal } from "@/providers/ModalProvider";
import ExchangeInputModal from "../buyers/[id]/_components/modal/ExchangeInputModal";
import { getAllCards } from "@/lib/api/card.api";
import SortAndSearchSection from "@/app/my-gallery/_components/SortAndSearchSection";
import { useInfiniteQuery } from "@tanstack/react-query";

function SelectPhotoCardsModal({ type = "판매", setIsModalOpen }) {
  const { openModal } = useModal();
  const scrollRef = useRef(null);

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
      <div
        className="relative w-full max-w-[1160px] bg-gray-500 h-screen max-h-[1000px] rounded-xl overflow-hidden flex flex-col px-[15px]"
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
            className="md:absolute md:left-[50%] md:translate-x-[-50%] scrollbar overflow-y-auto overflow-x-hidden md:px-[20px] md:w-[960px] h-[600px] grid grid-cols-2 mt-[20px] sm:mt-[40px] gap-y-[5px] sm:gap-y-4 place-items-center gap-x-[5px] sm:gap-x-[20px] md:gap-x-[40px]"
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

            {isLoading && (
              <div className="text-white mt-4 w-full flex items-center">
                로딩 중...
              </div>
            )}
            {isFetchingNextPage && (
              <div className="text-white mt-4 w-full flex justify-center">
                로딩 중...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectPhotoCardsModal;
