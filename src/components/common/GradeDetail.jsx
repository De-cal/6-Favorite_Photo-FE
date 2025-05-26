import React from "react";
import clsx from "clsx";

const gradeStyles = {
  COMMON: "text-main font-bold ",
  RARE: "text-blue font-bold",
  SUPERRARE: "text-purple font-bold",
  LEGENDARY: "text-pink font-bold ",
};

export default function GradeDetail({ grade, className = "text-[14px] md:text-[24px]" }) {
  return <span className={clsx(gradeStyles[grade], className)}>{grade === "SUPERRARE" ? "SUPER RARE" : grade}</span>;
}
