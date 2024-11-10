import { ChangeEvent, useState } from "react";
import ModalContainer from "./modalComponents/ModalContainer";
import ModalInput from "./modalComponents/ModalInput";
import useModalStore from "@/store/useModalStore";
import SubmitButton from "../SubMitButton";

const EditLink = ({ folderName }: { folderName: string }) => {
  const [value, setValue] = useState("");

  const { closeModal } = useModalStore();

  // 링크 정보를 먼저 가져와야함

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = async () => {
    const body = {
      name: value,
    };
    // if (value !== "") {
    //   try {
    //     const res = await putFolder(folderId, body);
    //     console.log(res);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    closeModal();
  };
  return (
    <ModalContainer title="링크 주소 변경">
      <ModalInput
        placeholder="내용 입력"
        name={folderName}
        value={value}
        onChange={handleChange}
      />
      <SubmitButton
        type="button"
        // onClick={handleSubmit}
        width="w-full"
        height="h-[51px] "
        color="positive"
      >
        변경하기
      </SubmitButton>
    </ModalContainer>
  );
};
export default EditLink;
