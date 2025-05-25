import React from "react";
import LoginForm from "../_components/LoginForm";
import AuthLogo from "../_components/AuthLogo";
import RedirectionLink from "../_components/RedirectionLink";
import GoogleAuthButton from "../_components/GoogleAuthButton";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full mt-[168px] sm:mt-[316px] md:mt-[277px]">
      <div className="w-full max-w-[520px] px-[15px] flex flex-col items-center gap-[80px]">
        <AuthLogo />
        <LoginForm />
        <GoogleAuthButton />
        <RedirectionLink />
      </div>
    </div>
  );
}
