import React, { useEffect, useState } from "react";
import ToTopBtn from "@/components/toTopBtn/ToTopBtn";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="w-full max-w-[1125px] mx-auto p-[10px] md:p-10 lg:p-10 px-[32.5px]">
      {children}
      {showBtn && <ToTopBtn />}
    </div>
  );
};

export default Container;
