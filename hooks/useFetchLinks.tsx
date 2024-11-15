import { useEffect, useState } from "react";
import { proxy } from "@/lib/api/axiosInstanceApi";
import { LinkData } from "@/types/linkTypes";

// 링크페이지의 query가 바뀌면 새로운 리스트로 업데이트 해주는 훅
const useFetchLinks = (
  query: {
    page?: number;
    search?: string;
  },
  setLinkCardList: (list: LinkData[]) => void
) => {
  useEffect(() => {
    const fetchLinks = async () => {
      const res = await proxy.get("/api/links", {
        params: {
          page: query.page,
          pageSize: 6,
          search: query.search,
        },
      });
      setLinkCardList(res.data.list);
    };

    if (query) fetchLinks();
  }, [query, setLinkCardList]);
};

export default useFetchLinks;
