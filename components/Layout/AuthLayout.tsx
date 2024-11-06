import Image from "next/image";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gray100 flex flex-col">
      <div>
        <Image src="/icons/logo.svg" width="211" height="38" alt="로고" />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
