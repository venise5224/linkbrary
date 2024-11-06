import React, { InputHTMLAttributes } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
}

const AuthInput = ({ text, ...props }: AuthInputProps) => {
  return (
    <div className="mb-6">
      <label htmlFor="password" className="text-[14px] block mb-[12px]">
        {text}
      </label>
      <input
        {...props}
        className="w-full h-[60px] rounded-lg border border-gray300 px-[15px] py-[18px]"
      />
    </div>
  );
};

export default AuthInput;
