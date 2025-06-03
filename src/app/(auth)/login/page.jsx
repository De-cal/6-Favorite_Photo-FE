import React from "react";
import LoginForm from "../_components/LoginForm";
import AuthLogo from "../_components/AuthLogo";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center max-w-[520px] w-full h-full gap-[80px] px-[15px] mt-[120px] sm:mt-[150px] md:mt-[200px] mb-[93px] sm:mb-[100px] md:mb-[120px] mx-auto">
      <AuthLogo />
      <LoginForm />
    </div>
  );
}
