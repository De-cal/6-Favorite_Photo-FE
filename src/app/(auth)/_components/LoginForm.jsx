"use client";
import React, { useState } from "react";
import useRedirectIfAuthenticated from "@/hooks/useRedirectIfAuthenticated.js";
import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";
import useLoginForm from "@/hooks/useLoginForm";
import { useRouter } from "next/navigation";
import AuthSubmitButton from "./AuthSubmitButton";
import GoogleAuthButton from "./GoogleAuthButton";
import AuthNavigation from "./AuthNavigation";
import AuthModal from "./AuthModal";
import { login } from "@/lib/api/auth.api";

export default function LoginForm() {
  // useRedirectIfAuthenticated(); 리팩터링 후 다시 적용예정
  const {
    email,
    password,
    isFormValid,
    isEmailValid,
    isPasswordValid,
    isEmailTouched,
    isPasswordTouched,
    handleEmailChange,
    handlePasswordChange,
    resetForm,
  } = useLoginForm();
  const router = useRouter();

  // 임시모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid) return;
    try {
      setIsLoading(true);
      await login({ email, password }); // 서버쪽에서 쿠키에 토큰 넣어줌
      resetForm();
      router.push("/marketplace");
    } catch (error) {
      console.error("로그인 실패", error);
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
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-[16px]">
          <AuthSubmitButton
            label={isLoading ? "로그인 중..." : "로그인"}
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
