"use client";

import React, { useState } from "react";
import RandomBoxCard from "./RandomBoxCard";
import pointImage from "@/assets/images/img-point.avif";
import Image from "next/image";

function RewardPoint({ clearTimer, formatTime, remainingTime }) {
  const [isSelected, setIsSelected] = useState(false);
  const [rewardPoints, setRewardPoints] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const handleGetPoint = () => {
    const points = Math.floor(Math.random() * 10) + 1;
    setRewardPoints(points);

    // TODO: 백엔드 및 api 코드 작성후 api 호출 부분 추가 예정.

    clearTimer();
    setIsSelected(true);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-3xl font-baskinRobbins mb-2">
        랜덤 <span className="text-main">포인트</span>
      </h2>
      {!isSelected ? (
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center font-bold py-4">
            <p>1시간마다 돌아오는 기회!</p>
            <p>랜덤 상자 뽑기를 통해 포인트를 획득하세요!</p>
          </div>
          <div className="flex flex-col items-center text-sm py-3">
            <p className="text-gray-300">다음 기회까지 남은 시간</p>
            <p className="text-main">{formatTime(remainingTime)}</p>
          </div>
          <div className="flex py-9">
            <RandomBoxCard
              boxColor={"blue"}
              selectedOption={selectedOption}
              handleSelectOption={handleSelectOption}
            />
            <RandomBoxCard
              boxColor={"purple"}
              selectedOption={selectedOption}
              handleSelectOption={handleSelectOption}
            />
            <RandomBoxCard
              boxColor={"red"}
              selectedOption={selectedOption}
              handleSelectOption={handleSelectOption}
            />
          </div>
          {selectedOption !== null && (
            <button
              className="bg-main text-black w-[300px] h-[55px] font-bold rounded-xs my-3"
              onClick={handleGetPoint}
            >
              선택완료
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center p-2">
          <Image src={pointImage} alt="getRandomPoint" />
          <p className="p-3 text-2xl font-bold">
            <span className="text-main">{rewardPoints}P</span> 획득!
          </p>

          <div className="flex flex-col items-center p-5">
            <p className="text-gray-300">다음 기회까지 남은 시간</p>
            <p className="text-main">{formatTime(remainingTime)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RewardPoint;
