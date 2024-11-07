import FolderList from "./modalComponents/FolderList";
import ModalContainer from "./modalComponents/ModalContainer";
interface ItemType {
  id: number;
  title: string;
  totalCount: number;
}
const list: ItemType[] = [
  { id: 1, title: "코딩팁", totalCount: 7 },
  { id: 2, title: "채용 사이트", totalCount: 7 },
  { id: 3, title: "유용한 글", totalCount: 7 },
  { id: 4, title: "나만의 장소", totalCount: 7 },
];

const AddModal = ({ list }: { list: ItemType[] }) => {
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
