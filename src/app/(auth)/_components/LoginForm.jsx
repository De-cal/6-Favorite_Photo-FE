"use client";
import React, { useState } from "react";
import useRedirectIfAuthenticated from "@/hooks/useRedirectIfAuthenticated.js";
import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";
import useLoginForm from "@/hooks/useLoginForm";
import { useRouter } from "next/navigation";
import AuthSubmitButton from "./AuthSubmitButton";
import GoogleAuthButton from "./GoogleAuthButton";

export default function LoginForm() {
  useRedirectIfAuthenticated();
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
      const data = await login({ email, password });
      // 액세스토큰, 리프레쉬 토큰 발급하여 저장
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
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
          <AuthSubmitButton label="로그인" isDisabled={!isFormValid || isLoading} />
          <GoogleAuthButton label="Google로 시작하기"/>
        </div>
      </form>
    </>
  );
}
