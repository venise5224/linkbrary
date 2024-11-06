import React from "react";

interface ContentLayoutProps {
  children: React.ReactNode;
}

const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <div className="w-full max-w-[1125px] mx-auto p-[10px] md:p-10 px-[32.5px]">
      {children}
    </div>
  );
};

export default ContentLayout;
