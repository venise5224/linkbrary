import { useEffect, useState } from "react";
import { getLink } from "@/lib/api/link";

// 폴더 id를 받아서 해당 폴더의 링크 리스트를 반환하는 훅
const useLinkListByFolderId = (folderId: number) => {
  const [linkCount, setLinkCount] = useState<number>(0);
  const [linkList, setLinkList] = useState([]);

  const getLinksByFolder = async () => {
    let query;
    try {
      const res = await getLink(query, folderId);
      const data = res.data;
      console.log(res);
      setLinkCount(data.totalCount);
      setLinkList(data.list);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getLinksByFolder();
  }, [folderId]);

  return { linkCount, linkList };
};

export default useLinkListByFolderId;
