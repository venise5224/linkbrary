import { useEffect } from "react";
import { proxy } from "@/lib/api/axiosInstanceApi";
import { LinkData } from "@/types/linkTypes";

// 검색어에 맞는 리스트로 setLinkCardList 해주는 함수
const useFetchLinks = (
  search: string | string[] | undefined,
  setLinkCardList: (list: LinkData[]) => void
) => {
  useEffect(() => {
    const fetchLinks = async () => {
      const res = await proxy.get("/api/links", { params: { search } });
      setLinkCardList(res.data.list);
    };
    if (search) fetchLinks();
  }, [search, setLinkCardList]);
};

export default useFetchLinks;
