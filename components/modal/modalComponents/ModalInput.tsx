import { bindCls } from "@/lib/utils";
import { ChangeEvent } from "react";

const ModalInput = ({
  placeholder,
  name,
  value,
  onChange,
}: {
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type="text"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className={bindCls(
        "w-full rounded-lg border border-gray300 py-[18px] px-[15px] mb-6 text-black300",
        "placeholder:text-base placeholder:text-gray400",
        "focus:outline-1px focus:outline-purple100"
      )}
      placeholder={placeholder}
    ></input>
  );
};

export default ModalInput;
