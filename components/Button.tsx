import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  width?: string;
  height?: string;
  radius?: string;
  type?: "positive" | "negative";
  size?: string;
}

const Button = ({
  children,
  width = "auto",
  height = "53px",
  radius = "8px",
  type = "positive",
  size = "18px",
}: ButtonProps) => {
  const backgroundStyle =
    type === "positive"
      ? "linear-gradient(90.99deg, #6D6AFE 0.12%, #6AE3FE 101.84%)"
      : "#FF5B56";

  return (
    <button
      style={{
        width,
        height,
        borderRadius: radius,
        background: backgroundStyle,
        fontSize: size,
      }}
      className="flex justify-center items-center text-white font-[600] whitespace-nowrap"
    >
      {children}
    </button>
  );
};

export default Button;
