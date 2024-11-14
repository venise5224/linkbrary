import { useEffect, useRef } from "react";
import { getFolders } from "@/lib/api/folder";
import { FolderData } from "@/types/folderTypes";

// Folder 관련 드랍다운이 닫혔을 때 화면에 update된 FolderList를 보여주는 커스텀 훅
const useRerenderFolderList = (
  isOpen: boolean,
  setFolderList: React.Dispatch<React.SetStateAction<FolderData[]>>
) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // 최초 로드 시에 불필요한 fetch 요청을 막아줌.
    }

    const fetchNewFolderList = async () => {
      const res = await getFolders();
      setFolderList(res);
    };

    if (!isOpen) {
      fetchNewFolderList(); // 드랍다운이 한번 열리고 닫혔을 때 데이터 fetch
    }
  }, [isOpen, setFolderList]);
};

export default useRerenderFolderList;
