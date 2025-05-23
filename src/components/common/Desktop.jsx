import React from "react";

export default function Desktop({ children }) {
  return <div className="hidden md:block">{children}</div>;
}
