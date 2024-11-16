import { ChangeEvent, useState } from "react";
import ModalContainer from "./modalComponents/ModalContainer";
import ModalInput from "./modalComponents/ModalInput";
import useModalStore from "@/store/useModalStore";
import { putFolder } from "@/lib/api/folder";
import SubmitButton from "../SubMitButton";

const EditModal = ({
  // folderName,
  folderId,
}: {
  // folderName: string;
  folderId: number;
}) => {
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
        await putFolder(folderId, body);
        console.log("폴더 수정 완료");
      } catch (error) {
        console.log(error);
      }
    }
    closeModal();
  };
  return (
    <ModalContainer title="폴더 이름 변경">
      <ModalInput
        placeholder="수정할 이름을 입력해 주세요"
        name="folderName"
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
        변경하기
      </SubmitButton>
    </ModalContainer>
  );
};
export default EditModal;
