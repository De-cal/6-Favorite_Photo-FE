"use client";
import { isRequired, validateEmail, validatePassword } from "@/utils/authValidators";
import React, { useState, useEffect } from "react";

export default function FormInput({
  id,
  label,
  placeholder,
  type = "text",
  className = "",
  onChange,
  value: propValue,
  isValid: propIsValid,
  isTouched = false,
  required,
  ...props
}) {
  const [inputValue, setInputValue] = useState(propValue || "");
  const [currentIsValid, setCurrentIsValid] = useState(propIsValid === undefined ? true : propIsValid);

  // 부모인 LoginForm or SignUpForm 에서 FormInput 에 value 프롭스로 내려줄때 변경시마다 inputValue 업데이트 하여 validation 처리
  useEffect(() => {
    if (propValue !== undefined) {
      setInputValue(propValue);
      setCurrentIsValid(validateInput(propValue).isValid);
    }
  }, [propValue]);

  const validateInput = (value) => {
    // 각 인풋 field의 id를 보고 해당하는 validator function 결과 리턴해줌 { "isValid": true } or { "isValid": false, "message": "invalid value"}
    // FormInput 은 이메일, 닉네임 필드에만 사용함, password 관련 인풋 컴포넌트는 따로 제작하여 관리
    // email 이나 nickname 인풋이 아닌 경우에는 isValid 디폴트 값으로 true로 설정
    if (id === "email") {
      return validateEmail(value);
    } else if (id === "nickname") {
      return validateNickname(value);
    } else if (required) {
      return isRequired(value);
    }
    return { isValid: true };
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    const validationResult = validateInput(newValue);
    setCurrentIsValid(validationResult.isValid);

    if (onChange) {
      onChange(newValue, validationResult.isValid);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-2.5 w-full">
        {label && (
          <label htmlFor={id} className="text-white font-normal">
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`h-[55px] md:h-[60px] rounded-xs border-1 border-gray-200 py-[18px] px-[20px]" outline-main placeholder:text-gray-200 ${
            currentIsValid && isTouched ? "outline-red" : ""
          } ${className}`}
          value={inputValue}
          {...props}
        />
        {!currentIsValid && isTouched && (
          <p className="text-red text-sm font-semibold leading-6">{validateInput(inputValue).message}</p>
        )}
      </div>
    </>
  );
}
