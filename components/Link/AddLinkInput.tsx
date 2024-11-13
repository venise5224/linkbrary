import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FolderListData } from "@/types/folderTypes";
import { Modal } from "../modal/modalManager/ModalManager";
import Image from "next/image";
import SubmitButton from "../SubMitButton";
import useModalStore from "@/store/useModalStore";

const AddLinkInput = ({ folderList }: FolderListData) => {
  const { isOpen, openModal } = useModalStore();
  const [link, setLink] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleClick = () => {
    openModal("AddModal", { list: folderList, link: link });
    setLink("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="flex bg-white gap-[12px] items-center w-[800px] h-[69px] py-[16px] px-[20px] border border-blue-500 rounded-[10px] md:w-[704px] sm:w-[325px] sm:h-[53px] transition-all">
      <Image src="/icons/link.svg" width={20} height={20} alt="link icon" />
      <input
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={link}
        placeholder="링크를 추가해 보세요."
        className="flex-grow"
      />
      <div onClick={handleClick}>
        <SubmitButton className="w-[80px] h-[37px]">추가하기</SubmitButton>
      </div>
      {isOpen && <Modal />}
    </div>
  );
};

export default AddLinkInput;
