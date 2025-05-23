import React from "react";

export default function Tablet({ children }) {
  return <div className="hidden sm:block md:hidden">{children}</div>;
}
