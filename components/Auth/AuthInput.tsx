import Image from "next/image";
import React, { InputHTMLAttributes, useState } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
  name: string;
}

const AuthInput = ({ text, name, type, ...props }: AuthInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggleClick = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="mb-6">
      <label htmlFor={name} className="text-[14px] block mb-[12px]">
        {text}
      </label>
      <div className="relative">
        <input
          {...props}
          type={isPasswordVisible ? "text" : type}
          className="w-full h-[60px] rounded-lg border border-gray300 px-[15px] py-[18px] pr-[40px] outline-purple100"
        />
        {type === "password" && (
          <Image
            src={
              isPasswordVisible
                ? "/icons/eyes_open.svg"
                : "/icons/eyes_close.svg"
            }
            width={16}
            height={16}
            alt={isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
            onClick={toggleClick}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default AuthInput;
