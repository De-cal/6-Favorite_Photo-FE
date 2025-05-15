import "./globals.css";
const baskinRobbins = localFont({
  src: "../assets/fonts/br-font-bold.woff2",
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
        <main className="relative flex-1 font-notoSans">{children}</main>
      </body>
    </html>
  );
}
