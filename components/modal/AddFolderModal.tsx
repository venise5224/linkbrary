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
  //토큰 받아오기
  const handleSubmit = async () => {
    const body = {
      name: value,
    };
    if (value !== "") {
      try {
        const res = await postFolders(body, {
          headers: {
            // Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 추가
          },
        });
        console.log(res); //res를 필요없을지도
      } catch (error) {
        console.log(error);
      }
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
