import { FolderData } from "@/types/folderTypes";
import useModalStore from "@/store/useModalStore";
import useRerenderFolderList from "@/hooks/useRerenderFolderList";

interface AddFolderButtonProps {
  setFolderList: React.Dispatch<React.SetStateAction<FolderData[]>>;
}

export const AddFolderButton = ({ setFolderList }: AddFolderButtonProps) => {
  const { isOpen, openModal } = useModalStore();

  useRerenderFolderList(isOpen, setFolderList);

  return (
    <button
      className="w-[79px] h-[19px] text-purple100"
      onClick={() => openModal("AddFolderModal")}
    >
      폴더 추가 +
    </button>
  );
};
export default AddFolderButton;
