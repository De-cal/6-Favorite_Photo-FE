import React from "react";
import clsx from "clsx";

const buttonSizeStyles = {
  "포토카드 구매하기": "w-[345px] h-[75px] text-lg md:w-[440px] md:h-[80px]",
  "판매 내리기": "w-[345px] h-[75px] text-lg md:w-[440px] md:h-[80px]",
  "포토카드 교환하기": "w-[345px] h-[55px] text-base md:w-[520px] md:h-[60px]",
  "승인": "w-[150px] h-[40px] text-xs",
  "거절": "w-[150px] h-[40px] text-xs",
};

export default function ActionButton({
  type = "button",
  variant = "primary",
  label,
  onClick,
  disabled = false,
  className,
  ...rest
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-[2px] cursor-pointer";
  // variant에 따른 스타일
  const variantStyles = {
    primary: clsx(
      disabled
        ? "bg-gray-400 text-gray-300 font-bold cursor-not-allowed pointer-events-none" // disabled 상태일때, 포인터 커서로 변경되지 않고 클릭도 안됨
        : "bg-main text-black font-bold"
    ),
    secondary: clsx("border border-gray-100 bg-black text-white font-medium"),
  };

  const sizeStyles = buttonSizeStyles[label] || "w-auto h-auto text-base";

  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles,
          className
        )}
        {...rest}
      >
        {label}
      </button>
    </>

    // <div className="bg-black flex flex-col gap-6">
    //   <h1>Primary</h1>
    //   <div className="inline-flex items-center justify-center  w-[345px] h-[75px] rounded-[2px] bg-main text-black text-lg/[26px] font-bold md:text-[20px]/[29px] md:w-[440px] md:h-[80px]">
    //     포토카드 구매하기
    //   </div>
    //   <div className="inline-flex items-center justify-center  w-[345px] h-[55px] rounded-[2px] bg-main text-black leading-[23px] font-bold sm:w-[440px] md:text-lg/[26px] md:w-[520px] md:h-[60px]">
    //     포토카드 교환하기
    //   </div>
    //   <div className="inline-flex items-center justify-center  w-[345px] h-[55px] rounded-[2px] bg-gray-400 text-gray-300 leading-[23px] font-bold sm:w-[440px] md:text-lg/[26px] md:w-[520px] md:h-[60px]">
    //     포토카드 교환하기 disabled
    //   </div>
    //   <div className="inline-flex items-center justify-center  w-[150px] h-[40px] rounded-[2px] bg-main text-black text-xs/[17px]">
    //     승인
    //   </div>
    //   <h1>Secondary</h1>
    //   <div className="inline-flex items-center justify-center w-[345px] h-[75px] rounded-[2px] border-gray-100 border-1 bg-black text-white text-lg/[26px] font-medium md:text-[20px]/[29px] md:w-[440px] md:h-[80px]">
    //     포토카드 구매하기
    //   </div>
    //   <div className="inline-flex items-center justify-center w-[345px] h-[55px] rounded-[2px] border-gray-100 border-1 bg-black text-white leading-[23px] font-medium sm:w-[440px] md:text-lg/[26px] md:w-[520px] md:h-[60px]">
    //     포토카드 교환하기
    //   </div>
    //   <div className="inline-flex items-center justify-center w-[150px] h-[40px] rounded-[2px]  border-gray-100 border-1  bg-black text-white text-xs/[17px]">
    //     거절
    //   </div>
    // </div>
  );
}
