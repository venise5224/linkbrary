import React, { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  width?: string;
  height?: string;
  radius?: string;
  color?: "positive" | "negative";
  size?: string;
}

const Button = ({
  children,
  width = "auto",
  height = "53px",
  radius = "8px",
  color = "positive",
  size = "18px",
  className = "",
  ...props
}: ButtonProps) => {
  const backgroundStyle =
    color === "positive"
      ? "linear-gradient(90.99deg, #6D6AFE 0.12%, #6AE3FE 101.84%)"
      : "#FF5B56";

  return (
    <button
      style={{
        borderRadius: radius,
        background: backgroundStyle,
      }}
      className={`flex justify-center ${width} ${height} ${size} ${className} items-center text-white font-[600] whitespace-nowrap hover:opacity-90`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
