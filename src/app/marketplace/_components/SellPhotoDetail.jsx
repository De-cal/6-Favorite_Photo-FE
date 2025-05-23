import React from "react";
import plus from "@/assets/icons/ic-plus.svg";
import minus from "@/assets/icons/ic-minus.svg";
import Image from "next/image";
import GradeDetail from "@/components/common/GradeDetail";
import { GenreChange } from "@/utils/genreChange";

function SellPhotoDetail({
  photoCard = {
    title: "우리집 앞마당",
    rank: "LEGENDARY",
    genre: "PORTRAIT",
    creator: {
      nickname: "프로여행러",
    },
  },
  quantity,
  sellQuantity,
  setSellQuantity,
  price,
  setPrice,
}) {
  return (
    <div className="flex flex-col w-[345px] sm:flex-1 ">
      <div className="flex flex-row justify-between w-full mt-[5px] sm:mt-0 text-[18px]">
        <div className="flex gap-[5px] items-center">
          <GradeDetail grade={photoCard.rank} />
          <div className="border-l border-gray-400 h-6 mx-[15px] "></div>
          <p className=" text-gray-300 font-bold">
            {GenreChange(photoCard.genre)}
          </p>
        </div>
        <p className="text-white underline font-bold">
          {photoCard.creator.nickname}
        </p>
      </div>
      <div className="border-b border-gray-400 h-[1px] w-full my-[10px] sm:my-[20px]">
        {" "}
      </div>
      <div className="flex flex-col gap-[20px]">
        <div className="flex justify-between items-center">
          <p>총 판매 수량</p>
          <div className="flex gap-[15px] w-[202px] md:w-[245px]">
            <div className="border-gray-200 border-1 flex w-[144px] h-[45px] justify-evenly items-center">
              <button
                onClick={() => setSellQuantity((prev) => prev - 1)}
                disabled={sellQuantity === 0}
              >
                <Image alt="minus" src={minus} />
              </button>
              <p>{sellQuantity}</p>
              <button
                onClick={() => setSellQuantity((prev) => prev + 1)}
                disabled={sellQuantity === quantity}
              >
                <Image alt="plus" src={plus} />
              </button>
            </div>
            <div>
              <p>/ {quantity}</p>
              <p className="text-gray-200 text-[12px] md:text-[14px] w-[54px]">
                최대 {quantity}장
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p>장당 가격</p>
          <div className="border-gray-200 border-1 w-[202px] h-[45px] md:w-[245px] md:h-[50px] relative flex justify-center">
            <input
              placeholder="숫자만 입력"
              className="absolute left-5 top-2 w-35"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <p className="absolute top-2 right-3">P</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellPhotoDetail;
