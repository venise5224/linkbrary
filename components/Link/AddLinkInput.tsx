import { ChangeEvent, FormEvent, useState } from "react";
import { FolderData } from "@/types/folderTypes";
import Image from "next/image";
import SubmitButton from "../SubMitButton";

interface AddLinkInputProps {
  folderList: FolderData[];
}

const AddLinkInput = ({ folderList }: AddLinkInputProps) => {
  const [link, setLink] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Addmodal 띄우면서 link, folders 전달해주어야 함.
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex bg-white gap-[12px] items-center w-[800px] h-[69px] py-[16px] px-[20px] border border-blue-500 rounded-[10px] md:w-[704px] sm:w-[325px] sm:h-[53px] transition-all"
    >
      <Image src="/icons/link.svg" width={20} height={20} alt="link icon" />
      <input
        onChange={handleChange}
        value={link}
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
