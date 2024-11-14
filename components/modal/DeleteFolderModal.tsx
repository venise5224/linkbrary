import useModalStore from "@/store/useModalStore";
import SubmitButton from "../SubMitButton";
import ModalContainer from "./modalComponents/ModalContainer";
import { deleteFolder } from "@/lib/api/folder";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import { getLink } from "@/lib/api/link";
import { useState } from "react";

const DeleteFolderModal = ({
  folderName,
  folderId,
}: {
  folderName: string;
  folderId: number;
}) => {
  const { closeModal } = useModalStore();
  const [linkCount, setLinkCount] = useState(0);

  // 폴더 내 링크 개수 확인
  const getLinkCountByFolder = async () => {
    let query;
    try {
      const res = await getLink(query, folderId);
      const data = res.data;
      console.log(res);
      console.log(data);
      // setLinkCount()
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    // 폴더 내에 링크 개수 0 일때만 삭제 가능 -> 링크 1개 이상이면 error toast 띄우겠습니다.
    getLinkCountByFolder();
    try {
      await deleteFolder(folderId);
      toast.success(toastMessages.success.deleteFolder);
    } catch (error) {
      toast.error(toastMessages.error.deleteFolder);
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
