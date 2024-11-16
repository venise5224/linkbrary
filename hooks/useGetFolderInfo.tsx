import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getFolder } from "@/lib/api/folder";

const useGetFolderInfo = () => {
  const router = useRouter();
  const folderId = router.query.folder;
  const [folderName, setFolderName] = useState("폴더이름");

  useEffect(() => {
    if (!folderId) return;

    const fetchFolderData = async () => {
      const res = await getFolder(folderId);
      if (res) setFolderName(res.data?.name);
    };
    fetchFolderData();
  }, [folderId]);

  return { folderName, folderId };
};
export default useGetFolderInfo;
