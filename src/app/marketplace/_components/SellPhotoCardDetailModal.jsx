"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import close from "@/assets/icons/ic-close.svg";
import example from "@/assets/images/img-card-placeholder-1.svg";
import ExchangeInfo from "./ExchangeInfo";
import SellPhotoDetail from "./SellPhotoDetail";
import MobileHeader from "@/components/common/MobileHeader";
import articleApi, { postArticle } from "@/lib/api/article.api";
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
    id: "default",
    exchangeGenre: "장르를 선택해 주세요",
    exchangeRank: "등급을 선택해 주세요",
    description: "",
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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const isDisabled =
    !price ||
    price <= 0 ||
    sellQuantity === 0 ||
    genre === "장르를 선택해 주세요" ||
    rank === "등급을 선택해 주세요" ||
    description === "";

  const handleClickSubmit = async () => {
    // if (genre === "장르를 선택해 주세요") {
    //   alert("장르를 선택해주세요.");
    //   return;
    // }
    // if (rank === "등급을 선택해 주세요") {
    //   alert("등급을 선택해주세요 ");
    //   return;
    // }
    // if (price <= 0) {
    //   alert("가격을 입력해주세요");
    //   return;
    // }
    // if (sellQuantity <= 0) {
    //   alert("판매 수량을 입력해주세요");
    //   return;
    // }
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
        const updatedArticle = await articleApi.patchArticle(article.id, {
          exchangeGenre,
          exchangeRank,
          exchangeText: description,
          totalQuantity: sellQuantity,
        });
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
    <div className="max-h-[1000px] h-screen md:w-[1160px] w-full bg-black sm:bg-gray-500 px-[15px] flex flex-col items-center pb-[50px] pt-[20px] overflow-hidden">
      <MobileHeader
        title={type === "sell" ? "나의 포토카드 판매하기" : "수정하기"}
        onClick={handleClickCloseModal}
      />
      <div className="w-full flex justify-center">
        <div className="bg-gray-400 w-[48px] h-[6px] hidden sm:block md:hidden rounded-[50px]"></div>
      </div>
      <div className="flex justify-end w-full mr-[40px] mt-[30px] ">
        <button
          onClick={handleClickCloseModal}
          className="cursor-pointer hidden md:block"
        >
          <Image src={close} alt="close" className="h-[32px] hidden sm:block" />
        </button>
      </div>
      <div className="overflow-y-auto scrollbar w-full">
        <div className="max-w-[920px] sm:w-full w-[345px] mx-auto">
          <div className="text-gray-300 font-baskinRobbins text-[16px] md:text-[24px] hidden sm:block">
            {type === "sell" ? "나의 포토카드 판매하기" : "수정하기"}
          </div>
          <div className="text-[26px] sm:text-[40px] md:text-[46px] mt-[15px] sm:mt-[40px] font-bold">
            {card.photoCard.title}
          </div>
          <div className=" border-b-2 border-white mt-[10px] sm:mt-[20px]">
            {" "}
          </div>
          <div className="mt-[26px] sm:mt-[48px] flex flex-col items-center sm:flex-row gap-[20px] md:gap-[40px] sm:justify-center sm:items-start w-full mb-[120px] sm:mb-[80px]">
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
          <div className="flex gap-[15px] sm:gap-[20px] md:gap-[40px] w-full justify-between mt-[44px] sm:mt-15 md:mt-[90px] ">
            <button
              className="py-[18px] border-1 border-gray-100 w-full font-bold cursor-pointer"
              onClick={closeModal}
            >
              취소하기
            </button>
            <button
              className={`py-[18px]   w-full font-bold cursor-pointer ${
                isDisabled
                  ? "bg-gray-400 !cursor-not-allowed text-gray-300"
                  : "bg-main text-black"
              }`}
              onClick={handleClickSubmit}
              disabled={isDisabled}
            >
              {type === "sell" ? "판매하기" : "수정하기"}
            </button>
          </div>
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
