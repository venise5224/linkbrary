import { useEffect, useRef } from "react";
import { FolderData } from "@/types/folderTypes";
import { getFolders } from "../../lib/api/folder";
import useModalStore from "@/store/useModalStore";

interface AddFolderButtonProps {
  setFolderList: React.Dispatch<React.SetStateAction<FolderData[]>>;
}

export const AddFolderButton = ({ setFolderList }: AddFolderButtonProps) => {
  const isFirstRender = useRef(true);
  const { isOpen, openModal } = useModalStore();

  useEffect(() => {
    if (isFirstRender.current === true) return; // 최초 로드시에 useEffect가 실행되어 불필요한 fetch 요청을 막아줌.
    const fetchNewFolderList = async () => {
      const res = await getFolders();
      setFolderList(res);
    };
    if (isOpen === false) fetchNewFolderList(); // 드랍다운이 닫혔을 때 새로운 폴더가 보이도록 해 줌.
  }, [isOpen, setFolderList]);

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
