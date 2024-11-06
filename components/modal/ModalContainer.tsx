import { MouseEvent, ReactNode } from "react";
import { IoIosClose } from "react-icons/io";

const ModalContainer = ({
  title,
  subtitle,
  children,
  onClick,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <div className="relative w-[360px]">
      <div className="flex flex-col bg-white rounded-[15px] border border-gray300">
        <div className="w-[280px] flex flex-col items-center gap-2 mt-8 mb-6 mx-auto text-black300 text-xl leading-6 font-bold">
          {title}
          {subtitle && (
            <div className="text-sm leading-[22px] font-normal text-gray400">
              {subtitle}
            </div>
          )}
        </div>
        <div className="mx-auto mb-8">{children}</div>
      </div>
      <button
        type="button"
        onClick={onClick}
        className="bg-gray200 absolute top-4 right-4 rounded-full size-6 flex justify-center items-center"
      >
        <IoIosClose className="text-gray400" strokeWidth={2} />
      </button>
    </div>
  );
};
export default ModalContainer;
