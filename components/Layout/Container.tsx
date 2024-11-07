import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="w-full max-w-[1125px] mx-auto p-[10px] md:p-10 px-[32.5px]">
      {children}
    </div>
  );
};

export default Container;
