"use client";
import {
  isRequired,
  validateEmail,
  validateNickname,
  validatePassword,
} from "@/lib/utils/authValidators";
import React, { useState, useEffect } from "react";
import clsx from "clsx";

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
  const [currentIsValid, setCurrentIsValid] = useState(
    propIsValid === undefined ? true : propIsValid,
  );

  useEffect(() => {
    if (propValue !== undefined) {
      setInputValue(propValue);
      setCurrentIsValid(validateInput(propValue).isValid);
    }
  }, [propValue]);

  const validateInput = (value) => {
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
    let newValue = event.target.value;
    if (id === "email") {
      newValue = newValue.toLowerCase();
    }

    setInputValue(newValue);
    const validationResult = validateInput(newValue);
    setCurrentIsValid(validationResult.isValid);

    if (onChange) {
      onChange(newValue);
    }
  };

  const isInvalid = !currentIsValid && isTouched;

  return (
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
        className={clsx(
          "w-full h-[55px] md:h-[60px] rounded-xs border py-[18px] px-[20px] placeholder:text-gray-200 focus:outline-none",
          isInvalid ? "border-red-500" : "border-gray-200 focus:border-main",
          className,
        )}
        value={inputValue}
        onChange={handleChange}
        {...props}
      />
      {isInvalid && (
        <p className="text-red text-sm font-semibold leading-6">
          {validateInput(inputValue).message}
        </p>
      )}
    </div>
  );
}
