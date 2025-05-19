import React from "react";
import clsx from "clsx";

export default function ActionButton({
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
  className,
  children, // 텍스트는 children으로 받음
  ...rest
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-[2px] cursor-pointer";

  // children (버튼 텍스트)에 따른 크기 (width, height) 그리고 폰트사이즈 반응형으로 지정하는 부분
  const sizeStyles = (() => {
    switch (children) {
      case "포토카드 구매하기":
      case "판매 내리기":
        return "w-[345px] h-[75px] text-lg md:text-xl md:w-[440px] md:h-[80px]";
      case "포토카드 교환하기":
        return "w-[345px] h-[55px] text-base md:text-lg md:w-[520px] md:h-[60px]";
      case "승인":
      case "거절":
        return "w-[150px] h-[40px] text-xs";
      default:
        return "w-auto h-auto text-base";
    }
  })();

  const variantStyles = {
    primary: clsx(
      disabled
        ? "bg-gray-400 text-gray-300 font-bold cursor-not-allowed pointer-events-none"
        : "bg-main text-black font-bold"
    ),
    secondary: clsx("border border-gray-100 bg-black text-white font-medium"),
  };

  return (
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
      {children}
    </button>
  );
}
