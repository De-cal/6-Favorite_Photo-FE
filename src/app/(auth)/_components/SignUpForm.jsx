"use client";
import useRedirectIfAuthenticated from "@/hooks/useRedirectIfAuthenticated";
import useSignUpForm from "@/hooks/useSignUpForm";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";
import AuthSubmitButton from "./AuthSubmitButton";
import GoogleAuthButton from "./GoogleAuthButton";
import AuthModal from "./AuthModal";
import AuthNavigation from "./AuthNavigation";
import { signUp } from "@/lib/api/auth.api";

export default function SignUpForm() {
  // 토큰이 있는 유저는 marketplace 페이지로 리다이렉트
  // useRedirectIfAuthenticated(); 리팩터링 해야함 쿠키토큰 방식에 맞게
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

  const router = useRouter();

  // 임시 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid) return;
    try {
      setIsLoading(true);
      await signUp({
        email,
        nickname,
        password,
        passwordConfirm,
      });
      resetForm();
      router.push("/marketplace");
    } catch (error) {
      console.error("회원가입 실패:", error);
      setModalMessage(error.message);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        className="flex flex-col items-center justify-center w-full h-full gap-[44px]"
        onSubmit={handleSubmit}
        action="submit"
      >
        <div className="flex flex-col items-center justify-center w-full gap-[34px]">
          <FormInput
            id="email"
            label="이메일"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={handleEmailChange}
            isValid={isEmailValid}
            isTouched={isEmailTouched}
            required
          />
          <FormInput
            id="nickname"
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={handleNicknameChange}
            isValid={isNicknameValid}
            isTouched={isNicknameTouched}
            required
          />
          <PasswordInput
            id="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={handlePasswordChange}
            isValid={isPasswordValid}
            isTouched={isPasswordTouched}
            required
          />
          <PasswordInput
            id="passwordConfirm"
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            value={passwordConfirm}
            passwordValue={password}
            onChange={handlePasswordConfirmChange}
            isValid={isPasswordConfirmValid}
            isTouched={isPasswordConfirmTouched}
            required
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-[16px]">
          <AuthSubmitButton
            label="회원가입"
            isDisabled={!isFormValid || isLoading}
          />
          <GoogleAuthButton label="Google로 시작하기" />
        </div>

        <AuthNavigation />
      </form>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalMessage}
      </AuthModal>
    </>
  );
}
