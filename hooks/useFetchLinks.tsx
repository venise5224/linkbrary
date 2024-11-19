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

      const res = await proxy.get(endpoint, {
        params: {
          page: query?.page,
          pageSize: isTablet ? 6 : 10,
          search: query?.search,
        },
      });
      setLinkCardList(res.data.list);
      {
        setTotalCount && setTotalCount(res.data.totalCount);
      }
    };

    if (query) fetchLinks();
  }, [setLinkCardList, query, isTablet]);

  return loading; // 로딩 상태 반환
};

export default useFetchLinks;
