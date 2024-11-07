import AddFolderModal from "@/components/modal/AddFolderModal";
import AddModal from "@/components/modal/AddModal";
import DeleteFolderModal from "@/components/modal/DeleteFolderModal";
import DeleteLinkModal from "@/components/modal/DeleteLinkModal";
import EditModal from "@/components/modal/EditModal";
import SNSModal from "@/components/modal/SNSModal";
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
export default function Test() {
  return (
    <div className="m-10">
      <div>테스트 페이지</div>
      <div>
        <AddFolderModal folderName="공부" />
        <AddModal list={list} />
        <DeleteFolderModal folderName="공부" />
        <DeleteLinkModal link="www.abc.com" />
        <SNSModal folderName="공부" />
        <EditModal folderName="공부" />
      </div>
    </div>
  );
}
