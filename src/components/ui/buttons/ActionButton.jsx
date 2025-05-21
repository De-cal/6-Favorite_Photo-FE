import React from "react";
import clsx from "clsx";

export default function ActionButton({
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
  children,
  ...rest
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-[2px] cursor-pointer";

  // children (버튼 텍스트)에 따른 기본 크기 (width, height, font-size)
  const sizeStyles = (() => {
    switch (children) {
      case "포토카드 구매하기":
      case "판매 내리기":
        return "w-[345px] h-[75px] sm:w-[342px] text-lg md:max-w-[440px] md:h-[80px] md:text-xl";
      case "포토카드 교환하기":
        return "w-[345px] h-[55px] sm:w-[342px] sm:h-[60px] text-base md:text-lg md:w-[520px]";
      case "승인":
      case "거절":
        return "w-[150px] h-[40px] text-xs";
      default:
        return "";
    }
  })();

  // variant 스타일 지정
  const variantStyles = {
    primary: clsx(
      disabled
        ? "bg-gray-400 text-gray-300 font-bold cursor-not-allowed pointer-events-none"
        : "bg-main text-black font-bold"
    ),
    secondary: clsx("border border-gray-100 bg-black text-white font-medium"),
    upload: clsx("border border-main text-main"),
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseStyles,
        sizeStyles, // 기본 사이즈 (버튼 텍스트에 따라 미리 지정되있음)
        variantStyles[variant],
        className // 기본 사이즈에 없는 케이스는 부모에서 직접 className에 사이즈 반응형으로 css값 내려줘야함
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
