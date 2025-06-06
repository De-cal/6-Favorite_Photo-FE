// app/loading.js (or any route's loading.js)

export default function Loading() {
  const gradeList = [
    { label: "COMMON", color: "text-main" },
    { label: "RARE", color: "text-blue" },
    { label: "SUPER RARE", color: "text-purple" },
    { label: "LEGENDARY", color: "text-pink" },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-20 sm:gap-30 h-screen text-center">
      <div className="flex gap-10 sm:gap-20">
        {/* 카드 백그라운드 테두리 그라데이션 div */}
        <div
          className="p-[2px] rounded-lg animate-float"
          style={{
            background:
              "linear-gradient(to bottom right, var(--color-main), var(--color-blue), var(--color-purple), var(--color-pink))",
          }}
        >
          {/* 카드 div */}
          <div className="w-60 h-90 sm:w-80 sm:h-120 rounded-lg bg-gray-500 flex flex-col items-center justify-start pt-5 px-3 gap-5 sm:gap-5">
            {/* 노란색 물음표 심볼 div */}
            <div className="w-50 h-40 sm:w-60 sm:h-50 relative text-[150px] font-extrabold font-baskinRobbins text-main sm:pt-10">
              ?
            </div>

            {/* 등급 롤링 애니메이션 */}
            <div className="relative h-10 overflow-hidden mt-10">
              <div className="grade-roller-loop">
                {[...Array(20)].flatMap((_, i) =>
                  gradeList.map((grade, j) => (
                    <p
                      key={`${i}-${j}`}
                      className={`h-10 flex items-center justify-center text-lg sm:text-xl font-baskinRobbins ${grade.color}`}
                    >
                      {grade.label}
                    </p>
                  )),
                )}
              </div>
            </div>

            {/* 최애의포토 타이틀 div */}
            <div className="flex flex-row items-center justify-center sm:mt-10">
              <p className="text-xl sm:text-2xl font-baskinRobbins text-white">
                최애
              </p>
              <p className="text-xl sm:text-2xl font-baskinRobbins text-main">
                의
              </p>
              <p className="text-xl sm:text-2xl font-baskinRobbins text-white">
                포토
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xl font-medium text-gray-600 animate-pulse">
        로딩중...
      </p>
    </div>
  );
}
