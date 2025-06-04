import React from "react";
import Image from "next/image";
import logo from "../../assets/images/img-logo.avif";
import soldout from "../../assets/icons/ic-soldout.svg";
import example from "../../assets/images/img-card-placeholder-1.svg";
import clsx from "clsx";
import GradeDetail from "./GradeDetail";
import { genreChange } from "@/lib/utils/genreChange";
import { getImageUrl } from "@/lib/utils/imageUrl";

function Card({
  onClick,
  type = "original",
  card = {
    photoCard: {
      title: "How Far I'll Go",
      rank: "RARE",
      genre: "PORTRAIT",
      imgURL: "",
      creator: {
        nickname: "프로여행러",
      },
    },
    price: 4,
    quantity: 1,

    status: "SELLING",
    totalQuantity: 5,
  },
}) {
  const StatusChange = (status) => {
    if (status === "SELLING") return "판매 중";
    if (status === "EXCHANGE_REQUESTED") return "교환 제시 대기 중";
  };

  // console.log("포토카드 컴포넌트에서", state);
  const isSoldout = type.endsWith("soldout");
  const isTotalQuantity = type === "original" || type === "soldout";
  const isExchange = type === "exchange";

  return (
    <div
      className={clsx(
        "bg-gray-500 border-1 border-white/10 flex flex-col items-center justify-center font-light cursor-pointer",
        "md:w-[440px] md:h-[600px] md:px-[40px]",
        isExchange
          ? "min-w-[342px] h-[517px] px-[20px] text-[16px] pt-[20px] pb-[30px] md:p-[40px]"
          : "w-[170px] h-[234px] px-[10px] text-[10px] sm:w-[342px] sm:h-[517px] sm:px-[20px] sm:text-[16px]",
      )}
      onClick={onClick}
    >
      <div
        className={clsx(
          "relative sm:mt-0",
          isExchange ? "mt-0 mb-[25px]" : "mt-[30px] mb-[10px] sm:mb-[25px]",
        )}
      >
        {type === "for_sale" && (
          <div
            className={clsx(
              "bg-black/50 absolute top-[5px] left-[5px] py-[5px] px-2 rounded-[2px]",
              isExchange ? "text-[14px]" : "text-[10px] sm:text-[14px]",
              {
                "text-white": card.status === "SELLING",
                "text-main": card.status === "EXCHANGE_REQUESTED",
              },
            )}
          >
            {StatusChange(card.status)}
          </div>
        )}
        {isSoldout && (
          <Image
            alt="soldout"
            src={soldout}
            priority
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[112px] h-auto sm:w-[200px] md:w-[230px] z-10"
          />
        )}
        <Image
          src={getImageUrl(card.photoCard.imgUrl)}
          alt="photocard"
          width={isExchange ? 302 : 150}
          height={isExchange ? 226 : 112}
          className={clsx(
            isSoldout && "brightness-50",
            "object-cover",
            "md:w-[360px] md:h-[270px]",
            isExchange
              ? "w-[302px] h-[226px]"
              : "w-[150px] h-[112px] sm:w-[302px] sm:h-[226px]",
          )}
        />
      </div>

      <div
        className={clsx(
          "w-full flex flex-col",
          isExchange ? "text-[16px]" : "text-[10px] sm:text-[16px]",
        )}
      >
        <p
          className={clsx(
            "text-white truncate overflow-hidden whitespace-nowrap w-full font-bold",
            isExchange ? "text-[22px]" : "text-sm sm:text-[22px]",
          )}
        >
          {card.photoCard.title}
        </p>
        <div
          className={clsx(
            "flex justify-between w-full",
            isExchange ? "mt-[10px]" : "mt-[5px] sm:mt-[10px]",
          )}
        >
          <div className="flex gap-[4px] items-center">
            <GradeDetail
              grade={card.photoCard.rank}
              className={clsx(
                isExchange ? "text-[16px]" : "text-[10px] sm:text-[16px]",
              )}
            />
            <div
              className={clsx(
                "border-l border-gray-400 h-3",
                isExchange ? "mx-[10px]" : "mx-[5px] sm:mx-[10px]",
              )}
            />
            <p className="text-gray-300">{genreChange(card.photoCard.genre)}</p>
          </div>
          <p className="text-white underline font-normal">
            {card.photoCard.creator.nickname}
          </p>
        </div>

        <div
          className={clsx(
            "border-b border-gray-400 h-[1px] w-full",
            isExchange ? "my-[20px]" : "my-[10px] sm:my-[20px]",
          )}
        />

        <div className="flex justify-between w-full">
          <p className="text-gray-300">가격</p>
          <p className="text-white font-normal">{card.price} P</p>
        </div>
        <div
          className={clsx(
            "flex justify-between w-full",
            isExchange ? "mt-[10px]" : "mt-[5px] sm:mt-[10px]",
          )}
        >
          <p className="text-gray-300">
            {type === "my_card" ? "수량" : "잔여"}
          </p>
          <div className="flex gap-[2px]">
            <p className="text-white font-normal">{card.quantity}</p>
            {isTotalQuantity && (
              <p className="text-gray-300">/ {card.totalQuantity}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-[30px] md:mt-[40px]">
        <Image
          src={logo}
          className={clsx(
            isExchange ? "block" : "hidden",
            "sm:block w-[100px] h-[18px]",
          )}
          alt="logo"
        />
      </div>
    </div>
  );
}

export default Card;
