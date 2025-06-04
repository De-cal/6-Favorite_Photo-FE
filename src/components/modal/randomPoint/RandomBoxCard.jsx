import React from "react";
import blueBox from "@/assets/images/img-box-blue-ribbon.webp";
import purpleBox from "@/assets/images/img-box-purple-ribbon.webp";
import redBox from "@/assets/images/img-box-red-ribbon.webp";
import Image from "next/image";
import clsx from "clsx";

function RandomBoxCard({ boxColor, selectedOption, handleSelectOption }) {
  const colorToBox = {
    blue: blueBox,
    red: redBox,
    purple: purpleBox,
  };

  return (
    <div>
      <Image
        src={colorToBox[boxColor]}
        alt="randomPointBox"
        className={clsx(
          `cursor-pointer ${
            selectedOption === null
              ? ""
              : selectedOption === boxColor
              ? ""
              : "brightness-50"
          }`,
          {
            "h-[79px] w-[89px]  sm:h-33 sm:w-[150px] md:h-[198px] md:w-[224px]  ":
              boxColor === "purple",
            "h-[76px] w-[98px]  sm:h-32 sm:w-41 md:h-[190px] md:w-[246px] ":
              boxColor !== "purple",
          },
        )}
        onClick={() => handleSelectOption(boxColor)}
      />
    </div>
  );
}

export default RandomBoxCard;
