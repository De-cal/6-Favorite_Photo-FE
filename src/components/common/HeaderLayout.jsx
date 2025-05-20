import React from "react";
import Header from "./Header";

export default function HeaderLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
