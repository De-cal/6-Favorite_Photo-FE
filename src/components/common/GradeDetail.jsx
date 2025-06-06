import React from "react";
import clsx from "clsx";

const gradeStyles = {
  COMMON: "text-main ",
  RARE: "text-blue",
  SUPERRARE: "text-purple",
  LEGENDARY: "text-pink",
};

export default function GradeDetail({ grade, className = "text-[14px] md:text-[24px]" }) {
  return <span className={clsx(gradeStyles[grade], className)}>{grade === "SUPERRARE" ? "SUPER RARE" : grade}</span>;
}
