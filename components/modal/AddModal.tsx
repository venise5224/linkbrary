import { FolderItemType } from "@/types/modalTypes";
import FolderList from "./modalComponents/FolderList";
import ModalContainer from "./modalComponents/ModalContainer";

const AddModal = ({ list }: { list: FolderItemType[] }) => {
  return (
    <ModalContainer
      title="폴더에 추가"
      subtitle="링크 주소"
      buttonText="추가하기"
    >
      <FolderList list={list} />
    </ModalContainer>
  );
};
export default AddModal;
