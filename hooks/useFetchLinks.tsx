import { useEffect } from "react";
import { proxy } from "@/lib/api/axiosInstanceApi";
import { LinkData } from "@/types/linkTypes";
import useViewport from "./useViewport";

// 링크페이지의 query가 바뀌면 그에 맞는 링크들을 보여주는 훅
const useFetchLinks = (
  query: {
    page?: string | string[] | undefined;
    search?: string | string[] | undefined;
    folder?: string | string[] | undefined;
  },
  setLinkCardList: (list: LinkData[]) => void
) => {
  const { isTablet } = useViewport();

  useEffect(() => {
    const fetchLinks = async () => {
      // params에 folder가 있다 = 폴더를 선택했다. = 해당하는 폴더의 링크들을 보여주어야 한다.
      const endpoint = query.folder
        ? `/api/folders/${query.folder}/links`
        : "/api/links";
      const res = await proxy.get(endpoint, {
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
