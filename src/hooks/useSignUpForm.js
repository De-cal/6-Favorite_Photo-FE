"use client";
import { useCallback } from "react";
import { validateEmail, validateNickname, validatePassword, validateConfirmPassword } from "@/lib/utils/authValidators";
import useForm from "./useForm";

export default function useSignUpForm() {
  const validators = {
    email: (value) => validateEmail(value),
    nickname: (value) => validateNickname(value),
    password: (value) => validatePassword(value),
    passwordConfirm: (value, allFields) => validateConfirmPassword(allFields.password, value),
  };

  // Use the generic form hook
  const { fields, validation, isFormValid, handleFieldChange, resetForm } = useForm({
    initialFields: {
      email: "",
      nickname: "",
      password: "",
      passwordConfirm: "",
    },
    validators,
  });

  const handleEmailChange = useCallback(
    (value) => {
      handleFieldChange("email", value);
    },
    [handleFieldChange],
  );

  const handleNicknameChange = useCallback(
    (value) => {
      handleFieldChange("nickname", value);
    },
    [handleFieldChange],
  );

  const handlePasswordChange = useCallback(
    (value) => {
      handleFieldChange("password", value, ["passwordConfirm"]);
    },
    [handleFieldChange],
  );

  const handlePasswordConfirmChange = useCallback(
    (value) => {
      handleFieldChange("passwordConfirm", value);
    },
    [handleFieldChange],
  );

  return {
    email: fields.email,
    nickname: fields.nickname,
    password: fields.password,
    passwordConfirm: fields.passwordConfirm,
    isFormValid,
    isEmailValid: validation.email.isValid,
    isNicknameValid: validation.nickname.isValid,
    isPasswordValid: validation.password.isValid,
    isPasswordConfirmValid: validation.passwordConfirm.isValid,
    isEmailTouched: validation.email.isTouched,
    isNicknameTouched: validation.nickname.isTouched,
    isPasswordTouched: validation.password.isTouched,
    isPasswordConfirmTouched: validation.passwordConfirm.isTouched,
    handleEmailChange,
    handleNicknameChange,
    handlePasswordChange,
    handlePasswordConfirmChange,
    resetForm,
  };
}
