import useModalStore from "@/store/useModalStore";
import SubmitButton from "../SubMitButton";
import ModalContainer from "./modalComponents/ModalContainer";
import { deleteFolder } from "@/lib/api/folder";

const DeleteFolderModal = ({
  folderName,
  folderId,
}: {
  folderName: string;
  folderId: number;
}) => {
  const { closeModal } = useModalStore();
  const handleSubmit = async () => {
    // 폴더 내에 링크 개수 0 일때만 삭제 가능 -> 링크 1개 이상이면 error toast 띄우겠습니다.
    try {
      await deleteFolder(folderId);
    } catch (error) {
      console.log(error, "DeleteFolderModal 폴더 삭제 에러");
    } finally {
      closeModal();
    }
  };

  return (
    <ModalContainer title="폴더 삭제" subtitle={folderName}>
      <SubmitButton
        type="button"
        onClick={handleSubmit}
        width="w-full"
        height="h-[51px]"
        color="negative"
      >
        삭제하기
      </SubmitButton>
    </ModalContainer>
  );
};
export default DeleteFolderModal;
