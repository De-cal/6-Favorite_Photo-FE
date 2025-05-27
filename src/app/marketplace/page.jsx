"use client";

import React, { useState } from "react";
import Image from "next/image";
import filterIcon from "../../assets/icons/ic-filter.svg";
import marketplace from "../../assets/images/img-marketplace.svg";
import { useEffect } from "react";
import { getAllArticles } from "@/api/article";
import { useModal } from "@/providers/ModalProvider";
// 컴포넌트
import MobileFilter from "../my-gallery/_components/MobileFilter";
import ActionButton from "@/components/ui/buttons/ActionButton";
import Search from "./_components/Search";
import Sort from "./_components/SortDropdown";
import SelectPhotoCardsModal from "./_components/SelectPhotoCardsModal";
import Card from "@/components/common/Card";
import Dropdowns from "./_components/Dropdowns";

export default function MarketplacePage() {
  const [showFilter, setShowFilter] = useState(false);
  const { openModal } = useModal();
  const [articles, setArticles] = useState([]);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [filterSettings, setFilterSettings] = useState(null);

  async function getArticles() {
    const data = await getAllArticles();
    setArticles(data);
  }
  const searchedCards = articles.filter((article) => {
    if (!searchKeyWord || searchKeyWord.trim() === "") return true;
    const keyword = searchKeyWord?.toLowerCase();
    return article.photoCard.title.toLowerCase().includes(keyword);
  });

  // 모바일
  const filteredCards = searchedCards.filter((article) => {
    if (!filterSettings) return true;
    const matchRank = filterSettings.rank
      ? article.photoCard.rank === filterSettings.rank
      : true;
    const matchGenre = filterSettings.genre
      ? article.photoCard.genre === filterSettings.genre
      : true;
    const matchSoldout = filterSettings.soldout
      ? article.status === filterSettings.soldout
      : true;

    return matchRank && matchGenre && matchSoldout;
  });
  // 태블릿, 데스크탑

  const handleSelectFilter = (selectedFilters) => {
    setFilterSettings(selectedFilters);
    setShowFilter(false);
  };

  useEffect(() => {
    getArticles();
  }, []);

  const handleClickOpenModal = () => {
    openModal(<SelectPhotoCardsModal />);
  };

  return (
    <div className="relative">
      {showFilter && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowFilter(false)}
        />
      )}
      <div
        className={`flex flex-col items-center ${
          showFilter ? "pointer-events-none" : ""
        }`}
      >
        <div className="px-[15px] sm:px-[20px] md:px-[0px] mt-[40px]">
          <div className="hidden sm:flex sm:gap-[114px] md:gap-[650px]">
            <Image
              src={marketplace}
              width={248}
              height={49}
              alt="marketplace"
              className="md:hidden"
            />

            <Image
              src={marketplace}
              width={320}
              height={63}
              alt="marketplace"
              className="hidden md:block"
            />
            <ActionButton
              className="w-[342px] h-[60px] md:w-[440px]"
              onClick={handleClickOpenModal}
            >
              나의 포토카드 판매하기
            </ActionButton>
          </div>
        </div>
        <div className="w-[704px] md:w-[1490px]">
          <div className="w-full mt-[15px] hidden sm:block">
            <div className="w-full h-[1px] border-b border-gray-400 sm:border-gray-100 sm:h-[2px]" />
          </div>
        </div>
        <div className="w-[704px] md:w-[1480px]">
          <div className="w-full">
            <div className="flex mt-[20px] justify-center sm:justify-between md:justify-between">
              <div className="flex items-center">
                <Search onSearch={setSearchKeyWord} />
                <Dropdowns onSearch={setFilterSettings} />
              </div>
              <Sort className="hidden sm:flex md:flex" />
            </div>
          </div>
        </div>
        <div className="w-[347px]">
          <div className="w-full px-[10px] sm:px-[20px] mt-[15px] block sm:hidden">
            <div className="w-full h-[1px] border-b border-gray-400 sm:border-gray-100 sm:h-[2px]" />
          </div>
        </div>
        <div className="w-[347px]">
          <div className=" px-[10px] mb-[20px] flex justify-between w-full mt-[15px]">
            <button
              onClick={() => setShowFilter(true)}
              className=" sm:hidden cursor-pointer rounded-[2px] flex items-center justify-center border border-gray-200 w-[35px] h-[35px]"
            >
              <Image alt="filerIcon" src={filterIcon} width={20} height={20} />
            </button>
            <Sort className="flex sm:hidden md:hidden" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-[5px] sm:gap-[20px] md:gap-[80px] mt-[20px] justify-items-center">
          {filteredCards.map((article) => (
            <Card
              key={article.id}
              type="for_sale"
              card={{
                photoCard: {
                  title: article.photoCard.title,
                  rank: article.photoCard.rank,
                  genre: article.photoCard.genre,
                  imgURL: article.photoCard.imgUrl,
                  creator: {
                    nickname: article.user.nickname,
                  },
                },
                price: article.price,
                quantity: article.quantity,
                status: article.status,
                totalQuantity: article.totalQuantity,
              }}
            />
          ))}
        </div>
      </div>
      {showFilter && (
        <div className="fixed bottom-0 left-0 w-full z-50 animate-slide-up">
          <MobileFilter data={articles} onSelectFilter={handleSelectFilter} />
          {/* 매진한거는 없어서 그부분은 안뜸 */}
        </div>
      )}
    </div>
  );
}
