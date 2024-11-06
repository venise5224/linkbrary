import Image from "next/image";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto bg-gray100 flex flex-col items-center justify-center h-screen">
      <div>
        <Image src="/icons/logo.svg" width="211" height="38" alt="로고" />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
