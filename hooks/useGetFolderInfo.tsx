import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getFolder } from "@/lib/api/folder";

const useGetFolderInfo = () => {
  const router = useRouter();
  const folderId = router.query.folder;
  const [folderName, setFolderName] = useState("폴더이름");

  useEffect(() => {
    if (!folderId) return;
    console.log("데이터 패칭 이전 folderId", folderId);

    const fetchFolderData = async () => {
      const res = await getFolder(folderId);
      console.log("getFolder에서 받아온 데이터:", res);
    };
    fetchFolderData();
  }, [folderId]);

  return { folderName, folderId };
};
export default useGetFolderInfo;
