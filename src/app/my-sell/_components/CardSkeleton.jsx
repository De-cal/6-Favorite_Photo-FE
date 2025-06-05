export default function CardSkeleton() {
  return (
    <div
      role="status"
      className="flex flex-col justify-center w-[170px] h-[234px] sm:w-[342px] sm:h-[517px] md:w-[440px] md:h-[600px] px-[10px] border border-gray-200 rounded-sm shadow-sm animate-custom-pulse md:p-6 dark:border-gray-800 sm:px-[20px] md:px-[40px]"
    >
      <div>
        <div className="w-[145px] h-[112px] sm:w-[300px] sm:h-[226px] md:w-[360px] md:h-[270px] flex items-center justify-center  mb-3 bg-gray-300 rounded-sm px-auto mx-auto dark:bg-gray-800 sm:mb-6 md:mb-[20px] ">
          <svg
            className="w-10 h-10 text-gray-400 dark:text-gray-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 20"
          >
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
          </svg>
        </div>
        <div className="h-2.5 sm:h-4.5 md:h-7 bg-gray-400 rounded-full dark:bg-gray-800 w-20 sm:w-30 md:w-45 mb-3 sm:mb-[15px]"></div>
        <div className="flex flex-row justify-between  border-b-1 sm:border-b-2  sm:pb-3 md:pb-5 mb-2 sm:mb-[20px] md:mb-10">
          <div className="flex flex-row justify-center gap-1 sm:gap-2 md:gap-3 ">
            <div className="h-[7px] sm:h-3 md:h-4.5 bg-gray-400 rounded-full w-5 sm:w-7  md:w-10 dark:bg-gray-800 mb-2.5 pr-0.5"></div>
            <div className="h-[7px] sm:h-3 md:h-4.5 bg-gray-400  w-[1px]  dark:bg-gray-800  pr-0.5"></div>
            <div className="h-[7px] sm:h-3 md:h-4.5 bg-gray-400 rounded-full w-5 sm:w-7  md:w-10 dark:bg-gray-800 mb-2.5"></div>
          </div>
          <div className="h-[7px] sm:h-3 md:h-4.5 bg-gray-400 rounded-full w-6 sm:w-10 md:w-15 dark:bg-gray-800"></div>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col w-full sm:gap-2">
          <div className="flex flex-row justify-between w-full ">
            <div className="h-[7px] sm:h-3.5 md:h-4.5 bg-gray-400 rounded-full dark:bg-gray-800 w-6 sm:w-8 md:w-12 mb-2"></div>
            <div className="h-[7px] sm:h-3.5 md:h-4.5 bg-gray-400 rounded-full dark:bg-gray-800 w-6 sm:w-8 md:w-12 mb-2"></div>
          </div>
          <div className="flex flex-row justify-between ">
            <div className="h-[7px] sm:h-3.5 md:h-4.5 bg-gray-400 rounded-full dark:bg-gray-800 w-6 sm:w-8 md:w-12 mb-2"></div>
            <div className="h-[7px] sm:h-3.5 md:h-4.5 bg-gray-400 rounded-full dark:bg-gray-800 w-6 sm:w-8 md:w-12 mb-2"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full items-center justify-center sm:mt-8 md:mt-7">
        <p className="font-baskinRobbins text-[10px] sm:text-2xl text-white">
          최애
        </p>
        <p className="font-baskinRobbins text-[10px] sm:text-2xl text-main">
          의
        </p>
        <p className="font-baskinRobbins text-[10px] sm:text-2xl text-white">
          포토
        </p>
      </div>
    </div>
  );
}
