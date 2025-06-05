import "./globals.css";
import localFont from "next/font/local";
import HeaderLayout from "@/components/common/HeaderLayout";
import Providers from "./Providers";
import BuyerProvider from "@/contexts/BuyerContext";
import SellerProvider from "@/contexts/SellerContext";
import SurprisePointModal from "@/components/modal/randomPoint/SurprisePointModal";

const baskinRobbins = localFont({
  src: "../assets/fonts/subset-br-font-bold.woff2",
  weight: "100 900",
  variable: "--font-baskinRobbins",
});

const notoSans = localFont({
  src: "../assets/fonts/noto-sans-kr.woff2",
  weight: "100 800",
  variable: "--font-notoSans",
});

export const metadata = {
  title: "최애의 포토",
  description: "당신의 최애의 포토를 거래해보세요",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${baskinRobbins.variable} ${notoSans.variable} min-h-screen flex flex-col bg-black text-white`}
      >
        <Providers>
          <HeaderLayout />
          <main className="relative flex-1 font-notoSans">
            <SurprisePointModal />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
