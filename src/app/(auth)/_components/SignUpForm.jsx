"use client";
import useSignUpForm from "@/hooks/useSignUpForm";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";
import AuthSubmitButton from "./AuthSubmitButton";
import GoogleAuthButton from "./GoogleAuthButton";
import AuthModal from "./AuthModal";
import AuthNavigation from "./AuthNavigation";
import { useAuth } from "@/providers/AuthProvider";

export default function SignUpForm() {
  const { signUp } = useAuth();
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
            label={isLoading ? "회원가입 중..." : "회원가입"}
            isDisabled={!isFormValid || isLoading}
          />
          {/* <GoogleAuthButton
            label="Google로 시작하기"
            onClick={() => {
              console.log("🚀 SignUpForm에서 구글 클릭");
              window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
            }}
          /> */}
        </div>
      </form>
      <div className="flex flex-col items-center justify-center w-full gap-[16px] mt-4">
        <GoogleAuthButton
          label="Google로 시작하기"
          onClickTwo={() => {
            console.log("폼내에서 버튼클릭");
          }}
        />
      </div>
      {/* <AuthNavigation /> */}
      <AuthNavigation />
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalMessage}
      </AuthModal>
    </>
  );
}
