import { useEffect } from "react";

export default function useCloseFilterOnResize(
  setShowFilter,
  breakpoint = 744,
) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= breakpoint) {
        setShowFilter(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setShowFilter, breakpoint]);
}
