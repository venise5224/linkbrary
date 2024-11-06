import { cls } from "@/lib/utils";

const ModalInput = ({ placeholder }: { placeholder?: string }) => {
  return (
    <input
      className={cls(
        "w-[280px] rounded-lg border border-gray300 py-[18px] px-[15px] mb-[15px] text-black300",
        "placeholder:text-base placeholder:text-gray400",
        "focus:outline-1px focus:outline-purple100"
      )}
      placeholder={placeholder}
    ></input>
  );
};

export default ModalInput;
