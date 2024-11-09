import { FolderItemType } from "@/types/modalTypes";
import FolderList from "./modalComponents/FolderList";
import ModalContainer from "./modalComponents/ModalContainer";
import SubmitButton from "../SubMitButton";
import { useState } from "react";
import { postLink } from "@/lib/api/link";

const AddModal = ({ list, link }: { list: FolderItemType[]; link: string }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSubmit = async () => {
    const body = {
      url: link,
      folderId: Number(selectedId),
    };
    if (link !== "" && selectedId) {
      try {
        const res = await postLink(body); // 테스트 필요 (상위에서 list, link받아서)
        console.log(res);
      } catch (error) {
        console.log(error, "링크 생성 에러");
      }
    }
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
