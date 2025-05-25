"use client";
import useRedirectIfAuthenticated from "@/hooks/useRedirectIfAuthenticated";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignUpForm() {
  // 토큰이 있는 유저는 marketplace 페이지로 리다이렉트
  useRedirectIfAuthenticated();
  const {
    email,
    nickname,
    password,
    passwordConfirm,
    isFormValid,
    isEmailValid,
    isNicknameValid,
    isPasswordValid,
    isPasswordConfirmValid,
    isEmailTouched,
    isNicknameTouched,
    isPasswordTouched,
    isPasswordConfirmTouched,
    handleEmailChange,
    handleNicknameChange,
    handlePasswordChange,
    handlePasswordConfirmChange,
    resetForm,
  } = useSignUpForm();

  const router = useRouter;

  // 임시 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return <div>SignUpForm</div>;
}
