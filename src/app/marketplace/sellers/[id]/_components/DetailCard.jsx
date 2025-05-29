import React from "react";
import Image from "next/image";
import logo from "@/assets/images/img-logo.avif";
import soldout from "@/assets/icons/ic-soldout.svg";
import example from "@/assets/images/img-card-placeholder-1.svg";
import clsx from "clsx";
import { genreChange } from "@/lib/utils/genreChange";
import ExchangeCards from "./ExchangeCards";

function DetailCard({
  onClick,
  type = "for_sale",
  card = {
    name: "How Far I'll Go",
    rank: "RARE",
    genre: "PORTRAIT",
    owner: "프로여행러",
    price: 4,
    quantity: 1,
    image: "",
    status: "SELLING",
    totalQuantity: 5,
  },
  ExchangeInfo,
}) {
  const StatusChange = (status) => {
    if (status === "SELLING") {
      return "판매 중";
    } else if (status === "WAITING_EXCHANGE") {
      return "교환 제시 대기 중";
    }
    return;
  };

  const isSoldout = type.endsWith("soldout");
  const isTotalQuantity = type === "original" || type === "soldout";
  return (
    <div
      className="w-[170px] h-[234px] sm:w-[342px] sm:h-[517px] md:w-[440px] md:h-[600px] bg-gray-500 border-1 border-white/10 flex flex-col items-center justify-center px-[10px] sm:px-[20px] md:px-[40px] font-light"
      onClick={onClick}
    >
      <div className="relative mb-[10px] sm:mb-[25px] mt-[30px] sm:mt-0">
        {type === "for_sale" && (
          <div
            className={clsx(
              "bg-black/50 absolute top-[5px] left-[5px] py-[5px] px-2 rounded-[2px] text-[10px] sm:text-[14px] md:text-[16px]",
              {
                "text-white": card.status === "SELLING",
                "text-main": card.status === "WAITING_EXCHANGE",
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
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[112px] h-auto sm:w-[200px] md:w-[230px] "
          />
        )}
        <Image
          src={example} //card.image로 수정
          alt="photocard"
          className={`w-[150px] h-[112px]  sm:w-[302px] sm:h-[226px] md:w-[360px] md:h-[270px] ${
            isSoldout && "brightness-50"
          }`}
        />
      </div>

      <div className=" text-[10px] sm:text-[16px] w-full flex flex-col">
        <p className="text-white text-sm sm:text-[22px] truncate overflow-hidden whitespace-nowrap w-full font-bold">
          {card.name}
        </p>
        <div className="flex flex-row justify-between w-full mt-[5px] sm:mt-[10px]">
          <div className="flex gap-[4px] items-center">
            <p
              className={clsx("font-normal", {
                "text-main": card.rank === "COMMON",
                "text-blue": card.rank === "RARE",
                "text-purple": card.rank === "SUPER RARE",
                "text-pink": card.rank === "LEGENDARY",
              })}
            >
              {card.rank}
            </p>
            <div className="border-l border-gray-400 h-3 "></div>
            <p className=" text-gray-300">{genreChange(card.genre)}</p>
          </div>
          <p className="text-white underline font-normal">{card.owner}</p>
        </div>

        <div className="border-b border-gray-400 h-[1px] w-full my-[10px] sm:my-[20px]">
          {" "}
        </div>

        {ExchangeInfo ? (
          <div>{<ExchangeCards />}</div>
        ) : (
          <>
            <div className="flex justify-between w-full">
              <p className="text-gray-300">가격</p>
              <p className="text-white font-normal">{card.price} P</p>
            </div>
            <div className="flex justify-between w-full mt-[5px] sm:mt-[10px]">
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
            <div className="flex justify-center mt-[30px] md:mt-[40px]">
              <Image
                src={logo}
                className="hidden sm:block w-[100px] h-[18px]"
                alt="logo"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DetailCard;
