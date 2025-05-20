import React from "react";
import clsx from "clsx";

const gradeStyles = {
  COMMON: "text-main font-bold text-[14px] md:text-[24px]",
  RARE: "text-blue font-bold text-[14px] md:text-[24px]",
  "SUPER RARE": "text-purple font-bold text-[14px] md:text-[24px]",
  LEGENDARY: "text-pink font-bold text-[14px] md:text-[24px]",
};

export default function GradeDetail({ grade }) {
  return (
    <span className={clsx(gradeStyles[grade])}>
      {grade}
    </span>
  );
}
