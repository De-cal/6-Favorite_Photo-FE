"use client";

import { useState } from "react";
import RandomBoxCard from "./RandomBoxCard";
import pointImage from "@/assets/images/img-point.avif";
import closeIcon from "@/assets/icons/ic-close.svg";
import Image from "next/image";
import { usePointTimer } from "@/providers/PointTimerProvider";
import { useModal } from "@/providers/ModalProvider";
import clsx from "clsx";
import { postPoint } from "@/api/point";
import { useMutation } from "@tanstack/react-query";

function RewardPoint() {
  const [isSelected, setIsSelected] = useState(false);
  const [rewardPoints, setRewardPoints] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const { formattedTime, spendOpportunity } = usePointTimer();
  const { closePointModal } = useModal();

  const { mutate: mutateGetPoint } = useMutation({
    mutationFn: postPoint,
    onSuccess: () => {
      spendOpportunity();
      setIsSelected(true);
      setSelectedOption(null);
    },
  });

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  // 포인트 획득 함수.
  const handleGetPoint = async () => {
    const points = Math.floor(Math.random() * 10) + 1;
    setRewardPoints(points);

    mutateGetPoint(points);
  };

  return (
    <div
      className={clsx(
        "relative flex flex-col justify-center items-center bg-gray-500 w-[345px] h-[541px]",
        {
          "sm:w-150 sm:h-125 md:w-[1034px] md:h-[646px]": !isSelected,
          "sm:w-[455px] sm:h-[658px] md:w-[455px] md:h-[678px]": isSelected,
        },
      )}
    >
      <button
        className="absolute top-4 right-4 md:top-8 md:right-8 text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer"
        onClick={closePointModal}
      >
        <Image src={closeIcon} alt="closeModalButton" />
      </button>
      <h2 className="font-baskinRobbins mb-2 text-3xl sm:text-4xl md:text-5xl  ">
        랜덤 <span className="text-main">포인트</span>
      </h2>
      {!isSelected ? (
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center font-bold py-4 md:text-xl ">
            <p>1시간마다 돌아오는 기회!</p>
            <p>랜덤 상자 뽑기를 통해 포인트를 획득하세요!</p>
          </div>
          <div className="flex flex-col items-center text-sm py-3 md:flex-row md:gap-3">
            <p className="text-gray-300">다음 기회까지 남은 시간</p>
            <p className="text-main">{formattedTime}</p>
          </div>
          <div className="flex py-9 md:gap-6 ">
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
              className="bg-main text-black w-[300px] sm:w-110 md:w-130 h-[55px] md:h-[60px] font-bold rounded-xs my-3"
              onClick={handleGetPoint}
            >
              선택완료
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Image
            src={pointImage}
            alt="getRandomPoint"
            className="object-cover w-60 h-57 sm:w-[340px] sm:h-[324px]"
          />
          <p className="p-3 mt-5 text-2xl sm:text-[28px] md:text-[32px] font-bold">
            <span className="text-main">{rewardPoints}P</span> 획득!
          </p>

          <div className="flex flex-col sm:flex-row sm:gap-2 items-center mt-5">
            <p className="text-gray-300">다음 기회까지 남은 시간</p>
            <p className="text-main">{formattedTime}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RewardPoint;
