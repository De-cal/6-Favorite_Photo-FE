"use client";
import React from "react";
import clsx from "clsx";

export default function FormInput({
  id,
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  onBlur,
  errorMessage = "",
}) {
  const isInvalid = !!errorMessage;

  return (
    <div className="flex flex-col gap-2.5 w-full mt-[25px] sm:mt-[50px] md:mt-[50px]">
      {label && (
        <label htmlFor={id} className="block mb-1 font-bold text-[20px] text-white">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={clsx(
          "w-full h-[55px] md:h-[60px] rounded-xs border py-[18px] px-[20px] bg-black placeholder:text-gray-200 text-white focus:outline-none",
          isInvalid ? "border-red-500" : "border-gray-200 focus:border-main"
        )}
      />
      {isInvalid && (
        <p className="text-red text-sm font-semibold leading-6">{errorMessage}</p>
      )}
    </div>
  );
}