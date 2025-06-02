import React from "react";
import Dropdown from "./marketplace/Dropdown";

function ExchangeInfo({
  genre,
  setGenre,
  rank,
  setRank,
  description,
  setDescription,
}) {
  return (
    <div>
      <div className="text-[22px] md:text-[28px] font-bold">교환 희망 정보</div>
      <div className=" border-b-2 border-white mt-[10px] sm:mt-[20px]  mb-[46px]">
        {" "}
      </div>
      <div>
        <div className="flex flex-col gap-[34px] sm:gap-[20px] md:gap-[40px] sm:flex-row">
          <Dropdown type="등급" value={rank} onChange={setRank} />
          <Dropdown type="장르" value={genre} onChange={setGenre} />
        </div>
        <div className="mt-[34px]">
          <div className="font-bold md:text-[20px]">교환 희망 설명</div>
          <textarea
            placeholder="설명을 입력해 주세요"
            className="border-1 w-full border-gray-200 mt-[10px] pt-[12px] pl-[20px] h-[120px] resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default ExchangeInfo;
