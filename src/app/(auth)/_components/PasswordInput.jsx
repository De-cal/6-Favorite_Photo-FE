import {
  validateConfirmPassword,
  validatePassword,
} from "@/lib/utils/authValidators";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import visibleIc from "@/assets/icons/ic-visible.svg";
import invisibleIc from "@/assets/icons/ic-invisible.svg";
import clsx from "clsx";

export default function PasswordInput({
  id,
  label,
  placeholder,
  type = "password",
  className = "",
  onChange,
  value: propValue,
  passwordValue, // 이 컴포넌트를 passwordConfirm 으로 쓸때, password 값을 여기다 넣어주기
  isValid: propIsValid,
  isTouched = false,
  ...props
}) {
  const [inputValue, setInputValue] = useState(propValue || "");
  const [visible, setVisible] = useState(false);
  const [currentIsValid, setCurrentIsValid] = useState(
    propIsValid === undefined ? true : propIsValid,
  );

  const isInvalid = !currentIsValid && isTouched;

  useEffect(() => {
    if (propValue !== undefined) {
      setInputValue(propValue);
      setCurrentIsValid(validateInput(propValue).isValid);
    }
  }, [propValue, passwordValue, id]);

  const validateInput = (value) => {
    if (id === "password") {
      return validatePassword(value);
    } else if (id === "passwordConfirm") {
      return validateConfirmPassword(passwordValue, value); // 여기서 VALUE는 passwordConfirmValue
    }
    return { isValid: true };
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    const validationResult = validateInput(newValue);
    setCurrentIsValid(validationResult.isValid);

    if (onChange) {
      // 부모의 컴포넌트에서 부른 onChange 함수에 newValue 전달해줌
      onChange(newValue);
    }
  };
  return (
    <div className="flex flex-col w-full gap-2.5">
      {label && (
        <label htmlFor={id} className="text-white font-normal">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          id={id}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          onChange={handleChange}
          className={clsx(
            "w-full h-[55px] md:h-[60px] rounded-xs border py-[18px] px-[20px] placeholder:text-gray-200 focus:outline-none",
            isInvalid ? "border-red-500" : "border-gray-200 focus:border-main",
            className,
          )}
          {...props}
        />

        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary-400 cursor-pointer"
        >
          {visible ? (
            <div className="relative w-[22px] h-[22px] md:w-[24px] md:h-[24px]">
              <Image
                src={visibleIc}
                alt="비밀번호 보이기"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="relative w-[22px] h-[22px] md:w-[24px] md:h-[24px]">
              <Image
                src={invisibleIc}
                alt="비밀번호 숨김"
                fill
                className="object-cover"
              />
            </div>
          )}
        </button>
      </div>
      {isInvalid && (
        <p className="text-error text-sm font-semibold leading-6">
          {validateInput(inputValue).message}
        </p>
      )}
    </div>
  );
}
