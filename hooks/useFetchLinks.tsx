import { useEffect } from "react";
import { proxy } from "@/lib/api/axiosInstanceApi";
import { LinkData } from "@/types/linkTypes";
import useViewport from "./useViewport";

// 링크페이지의 query가 바뀌면 새로운 리스트로 업데이트 해주는 훅
const useFetchLinks = (
  query: {
    page?: number;
    search?: string;
  },
  setLinkCardList: (list: LinkData[]) => void
) => {
  const { isTablet } = useViewport();

  useEffect(() => {
    const fetchLinks = async () => {
      const res = await proxy.get("/api/links", {
        params: {
          page: query.page,
          pageSize: isTablet ? 6 : 10,
          search: query.search,
        },
      });
      setLinkCardList(res.data.list);
    };

    if (query) fetchLinks();
  }, [query, setLinkCardList, isTablet]);
};

export default useFetchLinks;
