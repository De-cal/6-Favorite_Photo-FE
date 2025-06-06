import MobileHeader from "@/components/common/MobileHeader";

export default function TopSection() {
  return (
    <section className="w-full h-[60px] sm:h-[80px] md:h-[85px] sm:border-b-2 border-b-gray-100 flex justify-center items-center sm:justify-between relative sm:pb-[20px] md:pb-[21.5px] md:max-w-[1480px]">
      <MobileHeader title={"나의 판매 포토카드"} src="/" />

      <h1 className="font-baskinRobbins text-[20px] sm:text-[48px] md:text-[62px] hidden sm:block">
        나의 판매 포토카드
      </h1>
    </section>
  );
}

//
//
//
//
//
