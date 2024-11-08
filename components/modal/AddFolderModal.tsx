import { ChangeEvent, useState } from "react";
import ModalContainer from "./modalComponents/ModalContainer";
import ModalInput from "./modalComponents/ModalInput";
import { postFolders } from "@/lib/api/folder";
import useModalStore from "@/store/useModalStore";

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
      const res = await postFolders(body);
      console.log(res);
    }
    closeModal();
  };
  return (
    <ModalContainer
      title="폴더 추가"
      buttonText="추가하기"
      onClick={handleSubmit}
    >
      <ModalInput
        placeholder="내용 입력"
        name={folderName}
        value={value}
        onChange={handleChange}
      />
    </ModalContainer>
  );
};

export default AddFolderModal;
