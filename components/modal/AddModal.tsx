import { FolderItemType } from "@/types/modalTypes";
import FolderList from "./modalComponents/FolderList";
import ModalContainer from "./modalComponents/ModalContainer";
import SubmitButton from "../SubMitButton";
import { useState } from "react";

const AddModal = ({ list, link }: { list: FolderItemType[]; link: string }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSubmit = () => {
    //링크 생성 api 요청 또는 id 전달
  };

  const handleClickFolderItem = (id: number) => {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };
  return (
    <ModalContainer title="폴더에 추가" subtitle={link}>
      <FolderList
        list={list}
        selectedId={selectedId}
        onClick={handleClickFolderItem}
      />
      <SubmitButton
        type="button"
        onClick={handleSubmit}
        width="w-full"
        height="h-[51px] "
        color="positive"
      >
        추가하기
      </SubmitButton>
    </ModalContainer>
  );
};
export default AddModal;
