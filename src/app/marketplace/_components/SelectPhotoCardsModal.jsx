"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import close from "@/assets/icons/ic-close.svg";
import Card from "@/components/common/Card";
import SellPhotoCardDetailModal from "./SellPhotoCardDetailModal";
import { useModal } from "@/providers/ModalProvider";
import ExchangeInputModal from "../buyers/[id]/_components/modal/ExchangeInputModal";
import { getAllCards } from "@/api/card";
import SortAndSearchSection from "@/app/my-gallery/_components/SortAndSearchSection";

function SelectPhotoCardsModal({ type = "판매", setIsModalOpen }) {
  const [cards, setCards] = useState([]);

  const { openModal } = useModal();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState({
    keyword: "",
    rank: null,
    genre: null,
  });

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setCards([]);
    fetchCards(1);
  }, [searchFilter]);

  useEffect(() => {
    fetchCards(page);
  }, [page]);

  const fetchCards = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const fetchedCards = await getAllCards({
        ...searchFilter,
        page,
        includeZero: false,
      });
      if (fetchedCards.length === 0) {
        setHasMore(false);
      } else {
        setCards((prev) =>
          page === 1 ? fetchedCards : [...prev, ...fetchedCards],
        );
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

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
      openModal(<ExchangeInputModal card={card} />);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center bg-black/80 pt-[60px] sm:pt-[40px] md:py-[40px"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="max-w-[1160px] w-full bg-gray-500 px-[15px] flex flex-col items-center min-h-screen overflow-y-auto pb-[100px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end w-full mr-[30px] mt-[30px]">
          <button onClick={() => setIsModalOpen(false)}>
            <Image src={close} alt="close" className="h-[32px]" />
          </button>
        </div>
        <div className=" w-[345px] sm:w-[704px] md:w-[920px]">
          <div className="text-gray-300 font-baskinRobbins text-[14px] sm:text-[16px] md:text-[24px]">
            마이갤러리
          </div>
          <div className="font-baskinRobbins text-[26px] sm:text-[40px] md:text-[46px] mt-[15px] sm:mt-[40px]">
            {type === "판매" ? "나의 포토카드 판매하기" : "포토카드 교환하기"}
          </div>
          <div className="hidden sm:block border-b-2 border-white mt-[20px]">
            {" "}
          </div>
          <div className="flex gap-[10px] w-full mt-[20px] sm:flex-row-reverse">
            <SortAndSearchSection data={cards} onSearch={setSearchFilter} />
          </div>
          <div className="grid grid-cols-2 mt-[20px] sm:mt-[40px] gap-y-[5px] sm:gap-y-4 place-items-center gap-x-[5px] sm:gap-x-[20px] md:gap-x-[40px]">
            {cards.map((card) => (
              <Card
                key={card.id}
                onClick={() => handleClickOpenModal(card)}
                type="my_card"
                card={card}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectPhotoCardsModal;
