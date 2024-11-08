import { ChangeEvent, useState } from "react";
import ModalContainer from "./modalComponents/ModalContainer";
import ModalInput from "./modalComponents/ModalInput";

const AddFolderModal = ({ folderName }: { folderName: string }) => {
  const [value, setValue] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = () => {
    // api 요청
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
