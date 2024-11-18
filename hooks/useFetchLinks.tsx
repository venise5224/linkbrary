import { useEffect } from "react";
import { proxy } from "@/lib/api/axiosInstanceApi";
import { LinkData } from "@/types/linkTypes";
import { ParsedUrlQuery } from "querystring";
import useViewport from "./useViewport";

// 링크페이지의 query가 바뀌면 그에 맞는 링크들을 보여주는 훅
const useFetchLinks = (
  setLinkCardList: (list: LinkData[], totalCount: number) => void,
  setTotalCount?: React.Dispatch<React.SetStateAction<number>>,
  query?: ParsedUrlQuery,
  pathname?: string
) => {
  const { isMobile, isTablet } = useViewport();

  useEffect(() => {
    const fetchLinks = async () => {
      // 경로에 따라 API 엔드포인트 분기
      let endpoint =
        pathname === "/favorite"
          ? "/api/favorites"
          : query?.folder
            ? `/api/folders/${query.folder}/links`
            : "/api/links";

      const res = await proxy.get(endpoint, {
        params: {
          page: query?.page,
          pageSize: isMobile ? 10 : isTablet ? 6 : 9,
          search: query?.search,
        },
      });
      console.log("useFetchLinks 함수에서 다시 받아온 리스트:", res.data.list);
      setLinkCardList(res.data.list, res.data.totalCount);
      {
        setTotalCount && setTotalCount(res.data.totalCount);
      }
    };
    if (query) fetchLinks();
  }, [setLinkCardList, query, isTablet, isMobile]);
};

export default useFetchLinks;
