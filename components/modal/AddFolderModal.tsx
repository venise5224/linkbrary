import { ChangeEvent, useState } from "react";
import { postFolders } from "@/lib/api/folder";
import ModalContainer from "./modalComponents/ModalContainer";
import ModalInput from "./modalComponents/ModalInput";
import useModalStore from "@/store/useModalStore";
import SubmitButton from "../SubMitButton";

const AddFolderModal = ({ folderName }: { folderName: string }) => {
  const [value, setValue] = useState("");

  const { closeModal } = useModalStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = async () => {
    const body = {
      name: value,
    };
    if (value !== "") {
      try {
        await postFolders(body);
      } catch (error) {
        console.log(error, "폴더 생성 에러");
      }
    }
    closeModal();
  };
  return (
    <ModalContainer title="폴더 추가">
      <ModalInput
        placeholder="내용 입력"
        name={folderName}
        value={value}
        onChange={handleChange}
      />
      <SubmitButton
        type="button"
        onClick={handleSubmit}
        width="w-full"
        height="h-[51px]"
        color="positive"
      >
        추가하기
      </SubmitButton>
    </ModalContainer>
  );
};

export default AddFolderModal;
