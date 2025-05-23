import React from "react";

export default function Mobile({ children }) {
  return <div className="sm:hidden">{children}</div>;
}
