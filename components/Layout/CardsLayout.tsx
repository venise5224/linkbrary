import React from "react";

interface CardsLayoutProps {
  children: React.ReactNode;
}

const CardsLayout = ({ children }: CardsLayoutProps) => {
  return (
    <div className="grid place-items-center grid-cols-1 my-[24px] md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-[20px] w-full">
      {children}
    </div>
  );
};

export default CardsLayout;
