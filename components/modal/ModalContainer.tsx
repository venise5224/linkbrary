import { MouseEvent, ReactNode } from "react";
import { IoIosClose } from "react-icons/io";
import Button from "../Button";

const ModalContainer = ({
  title,
  subtitle,
  children,
  buttonText,
  onClick,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  buttonText?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <div className="relative w-[360px] py-8 px-10 flex flex-col gap-6 bg-white rounded-[15px] border border-gray300">
      {/* 제목 + 부제목 */}
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-center w-[280px] gap-2 text-black300 text-xl leading-6 font-bold">
          {title}
        </div>
        {subtitle && (
          <div className="text-sm leading-[22px] font-normal text-gray400">
            {subtitle}
          </div>
        )}
      </div>
      {/* children -> inpul, sns공유, folder list 등.. */}
      <div className="flex justify-center items-center flex-col">
        {children && <>{children}</>}

        {/* 제출 버튼 */}
        {buttonText && (
          <Button type="button" width="w-full" height="h-[51px]">
            {buttonText}
          </Button>
        )}
      </div>

      {/* 모달 닫기 버튼 */}
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
