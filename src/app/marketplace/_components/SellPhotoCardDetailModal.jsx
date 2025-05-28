"use client";
import Image from "next/image";
import React, { useState } from "react";
import close from "@/assets/icons/ic-close.svg";
import example from "@/assets/images/img-card-placeholder-1.svg";
import ExchangeInfo from "./ExchangeInfo";
import SellPhotoDetail from "./SellPhotoDetail";
import MobileHeader from "@/components/common/MobileHeader";
import { postArticle } from "@/api/article";
import CommonModal from "@/components/common/CommonModal";
import { useModal } from "@/providers/ModalProvider";

function SellPhotoCardDetailModal({
  card = {
    photoCard: {
      title: "How Far I'll Go",
      rank: "RARE",
      genre: "PORTRAIT",
      creator: {
        nickname: "프로여행러",
      },
    },
    quantity: 3,
  },
  setIsModalOpen,
  article = {
    exchangeGenre: "장르를 선택해 주세요",
    exchangeRank: "등급을 선택해 주세요",
    description: "",
    price: 0,
    totalQuantity: 0,
  },
  type = "sell",
}) {
  const { closeModal } = useModal();
  const [genre, setGenre] = useState(article.exchangeGenre);
  const [rank, setRank] = useState(article.exchangeRank);
  const [description, setDescription] = useState(article.description);
  const [price, setPrice] = useState(article.price);
  const [sellQuantity, setSellQuantity] = useState(article.totalQuantity);
  const [result, setResult] = useState("");

  const handleClickSubmit = async () => {
    if (genre === "장르를 선택해 주세요") {
      alert("장르를 선택해주세요.");
      return;
    }
    if (rank === "등급을 선택해 주세요") {
      alert("등급을 선택해주세요 ");
      return;
    }
    if (price <= 0) {
      alert("가격을 입력해주세요");
      return;
    }
    if (sellQuantity <= 0) {
      alert("판매 수량을 입력해주세요");
      return;
    }
    try {
      if (type === "sell") {
        const newArticle = await postArticle({
          exchangeGenre: genre,
          exchangeRank: rank,
          exchangeText: description,
          totalQuantity: sellQuantity,
          userPhotoCardId: card.id,
          price,
        });
        setResult("성공");
      } else {
      }
    } catch (error) {
      //수정 성공/실패 모달?
      setResult("실패");
    }
  };
  const handleClickCloseModal = () => {
    closeModal();
    setIsModalOpen(true);
  };

  return (
    <div className="md:w-[1160px] w-full bg-gray-500 px-[15px] flex flex-col items-center min-h-screen overflow-y-auto pb-[100px] pt-[20px]">
      <MobileHeader
        title={type === "sell" ? "나의 포토카드 판매하기" : "수정하기"}
        onClick={handleClickCloseModal}
      />
      <div className="flex justify-end w-full mr-[30px] mt-[30px]">
        <button onClick={handleClickCloseModal}>
          <Image src={close} alt="close" className="h-[32px] hidden sm:block" />
        </button>
      </div>
      <div className="max-w-[920px] sm:w-full w-[345px] md:mx-[120px]">
        <div className="text-gray-300 font-baskinRobbins text-[16px] md:text-[24px] hidden sm:block">
          {type === "sell" ? "나의 포토카드 판매하기" : "수정하기"}
        </div>
        <div className="text-[26px] sm:text-[40px] md:text-[46px] mt-[15px] sm:mt-[40px] font-bold">
          {card.photoCard.title}
        </div>
        <div className=" border-b-2 border-white mt-[10px] sm:mt-[20px]"> </div>
        <div className="mt-[26px] sm:mt-[48px] flex flex-col items-center sm:flex-row gap-[20px] md:gap-[40px] sm:justify-center sm:items-start w-full">
          <Image
            src={example}
            alt="photocard"
            className="w-[345px] sm:flex-1"
          />
          <SellPhotoDetail
            quantity={card.quantity}
            price={price}
            setPrice={setPrice}
            sellQuantity={sellQuantity}
            setSellQuantity={setSellQuantity}
            photoCard={card.photoCard}
          />
        </div>
        <ExchangeInfo
          setDescription={setDescription}
          description={description}
          genre={genre}
          setGenre={setGenre}
          rank={rank}
          setRank={setRank}
        />
        <div className="flex gap-[15px] sm:gap-[20px] md:gap-[40px] w-full justify-between mt-[44px] sm:mt-15 md:mt-[90px]">
          <button
            className="py-[18px] border-1 border-gray-100 w-full font-bold"
            onClick={closeModal}
          >
            취소하기
          </button>
          <button
            className="py-[18px] bg-main text-black w-full font-bold"
            onClick={handleClickSubmit}
          >
            {type === "sell" ? "판매하기" : "수정하기"}
          </button>
        </div>
      </div>
      {result && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
          <CommonModal
            type="판매 등록"
            result={result}
            data={{
              rank: card.photoCard.rank,
              title: card.photoCard.title,
              quantity: sellQuantity,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default SellPhotoCardDetailModal;
