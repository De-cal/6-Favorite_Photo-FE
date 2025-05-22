import React from "react";
import blueBox from "@/assets/images/img-box-blue-ribbon.avif";
import purpleBox from "@/assets/images/img-box-purple-ribbon.avif";
import redBox from "@/assets/images/img-box-red-ribbon.avif";
import Image from "next/image";

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
        className={`h-19 cursor-pointer ${
          selectedOption === null
            ? ""
            : selectedOption === boxColor
            ? ""
            : "brightness-50"
        } `}
        onClick={() => handleSelectOption(boxColor)}
      />
    </div>
  );
}

export default RandomBoxCard;
