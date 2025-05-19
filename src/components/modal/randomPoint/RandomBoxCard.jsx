import React from "react";
import blueBox from "@/assets/images/img-box-blue-ribbon.svg";
import purpleBox from "@/assets/images/img-box-purple-ribbon.svg";
import redBox from "@/assets/images/img-box-red-ribbon.svg";
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
