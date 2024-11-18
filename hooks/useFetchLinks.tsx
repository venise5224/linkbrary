import { useState, useEffect } from "react";
import { proxy } from "@/lib/api/axiosInstanceApi";
import { LinkData } from "@/types/linkTypes";
import { ParsedUrlQuery } from "querystring";
import useViewport from "./useViewport";

// 링크 페이지의 query가 바뀌면 그에 맞는 링크들을 보여주는 훅
const useFetchLinks = (
  setLinkCardList: React.Dispatch<React.SetStateAction<LinkData[]>>,
  setTotalCount?: React.Dispatch<React.SetStateAction<number>>,
  query?: ParsedUrlQuery,
  pathname?: string
) => {
  const { isTablet } = useViewport();
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태 관리

  useEffect(() => {
    const fetchLinks = async () => {
      if (isTablet === undefined) return; // isTablet이 정의되지 않았으면 API 호출을 막음

      setLoading(true); // API 호출 시작 시 로딩 상태 true

      // 경로에 따라 API 엔드포인트 분기
      let endpoint =
        pathname === "/favorite"
          ? "/api/favorites"
          : query?.folder
            ? `/api/folders/${query.folder}/links`
            : "/api/links";

      try {
        const res = await proxy.get(endpoint, {
          params: {
            page: query?.page,
            pageSize: isTablet ? 6 : 9,
            search: query?.search,
          },
        });
        console.log("query가 바뀌었을 때 다시 받아온 리스트:", res.data.list);
        setLinkCardList(res.data.list);
        if (setTotalCount) {
          setTotalCount(res.data.totalCount);
        }
      } catch (error) {
        console.error("Error fetching links:", error);
      } finally {
        setLoading(false); // API 호출 종료 후 로딩 상태 false
      }
    };

    if (query) fetchLinks();
  }, [setLinkCardList, setTotalCount, query, isTablet, pathname]);

  return loading; // 로딩 상태 반환
};

export default useFetchLinks;
