import React from "react";
import SignUpForm from "../_components/SignUpForm";
import AuthLogo from "../_components/AuthLogo";

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center max-w-[520px] w-full h-full gap-[60px] px-[15px] mt-[80px] mb-[58px] sm:mt-[100px] md:mt-[110px] mx-auto">
      <AuthLogo />
      <SignUpForm />
    </div>
  );
}
