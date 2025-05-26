"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import close from "@/assets/icons/ic-close.svg";
import Card from "@/components/common/Card";
import SellPhotoCardDetailModal from "./SellPhotoCardDetailModal";
import Search from "./Search";
import filter from "@/assets/icons/ic-filter.svg";
import Filter from "./Filter";
import FilterDropdown from "./FilerDropdown";
import { useModal } from "@/providers/ModalProvider";
import ExchangeInputModal from "../buyers/[id]/_components/modal/ExchangeInputModal";
import { getAllCards } from "@/api/card";

function SelectPhotoCardsModal({ type = "판매" }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    const fetchAllCards = async () => {
      const fetchCards = await getAllCards();
      setCards(fetchCards);
    };
    fetchAllCards();
  }, []);

  const handleClickOpenModal = (card) => {
    if (type === "판매") {
      openModal(<SellPhotoCardDetailModal card={card} />);
    } else {
      openModal(<ExchangeInputModal card={card} />);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/80 pt-[60px] sm:pt-[40px] md:py-[40px">
      <div className="max-w-[1160px] w-full bg-gray-500 px-[15px] flex flex-col items-center min-h-screen overflow-y-auto pb-[100px]">
        <div className="flex justify-end w-full mr-[30px] mt-[30px]">
          <button onClick={closeModal}>
            <Image src={close} alt="close" className="h-[32px]" />
          </button>
        </div>
        <div className=" w-[345px] sm:w-[704px] md:w-[920px]">
          <div className="text-gray-300 font-baskinRobbins text-[14px] sm:text-[16px] md:text-[24px]">마이갤러리</div>
          <div className="font-baskinRobbins text-[26px] sm:text-[40px] md:text-[46px] mt-[15px] sm:mt-[40px]">
            {type === "판매" ? "나의 포토카드 판매하기" : "포토카드 교환하기"}
          </div>
          <div className="hidden sm:block border-b-2 border-white mt-[20px]"> </div>
          <div className="flex gap-[10px] w-full mt-[20px] sm:flex-row-reverse">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="border-1 border-gray-200 w-[45px] h-[45px] flex justify-center items-center sm:hidden"
            >
              <Image alt="filter" src={filter} className="w-[20px]" />
            </button>
            <FilterDropdown />
            <Search />
          </div>
          <div className="grid grid-cols-2 mt-[20px] sm:mt-[40px] gap-y-[5px] sm:gap-y-4 place-items-center gap-x-[5px] sm:gap-x-[20px] md:gap-x-[40px]">
            {cards.map((card) => (
              <Card key={card.id} onClick={() => handleClickOpenModal(card)} type="my_card" card={card} />
            ))}
          </div>
        </div>
      </div>
      {isFilterOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex justify-center items-end">
          <Filter />
        </div>
      )}
    </div>
  );
}

export default SelectPhotoCardsModal;
