import Image from "next/image";
import React from "react";
import logo from "@/assets/images/img-logo.webp";
import Link from "next/link";

export default function AuthLogo() {
  return (
    <Link href="/">
      <div className="relative w-[189px] h-[35px] sm:w-[330px] sm:h-[60px]">
        <Image
          src={logo}
          alt="최애의 포토"
          fill
          className="object-cover"
          priority
        />
      </div>
    </Link>
  );
}
