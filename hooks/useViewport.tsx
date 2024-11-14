import { useState, useEffect } from "react";

const breakpoints = {
  PC: { min: 1200 },
  Tablet: { min: 768, max: 1199 },
  Mobile: { min: 343, max: 767 },
};

// 현재 브라우저의 innerWidth와 반응형 상태를 반환하는 훅
function useViewport(initialWidth = 0) {
  const [width, setWidth] = useState(initialWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isPC = width >= breakpoints.PC.min;
  const isTablet =
    width >= breakpoints.Tablet.min && width <= breakpoints.Tablet.max;
  const isMobile =
    width >= breakpoints.Mobile.min && width <= breakpoints.Mobile.max;

  return { width, isPC, isTablet, isMobile };
}

export default useViewport;
