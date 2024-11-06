import { ReactNode } from "react";

const ModalContent = ({
  buttonText,
  children,
}: {
  buttonText?: string;
  children?: ReactNode;
}) => {
  return (
    <div>
      {children && <div>{children}</div>}
      {buttonText && (
        <button type="button" className="bg-blue-300 w-full">
          {buttonText}
        </button>
      )}
    </div>
  );
};
export default ModalContent;
