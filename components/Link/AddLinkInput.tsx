import { ChangeEvent, FormEvent, useState } from "react";
import { postLink } from "@/lib/api/link";
import Image from "next/image";
import SubmitButton from "../SubMitButton";

const AddLinkInput = (folderId: number) => {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postLink({ url: value, folderId });
    // postLink 하고 추가된 link가 보이도록 하는 로직 구현해야 함.
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-[12px] items-center w-[800px] h-[69px] py-[16px] px-[20px] border border-blue-500 rounded-[10px] md:w-[704px] sm:w-[325px] sm:h-[53px] transition-all"
    >
      <Image src="/icons/link.svg" width={20} height={20} alt="link icon" />
      <input
        onChange={handleChange}
        value={value}
        placeholder="링크를 추가해 보세요."
        className="flex-grow"
      />
      <SubmitButton color="positive" className="w-[80px] h-[37px]">
        추가하기
      </SubmitButton>
    </form>
  );
};

export default AddLinkInput;
