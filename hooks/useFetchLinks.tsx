import { useEffect, useState } from "react";
import { proxy } from "@/lib/api/axiosInstanceApi";
import { LinkData } from "@/types/linkTypes";
import { useRouter } from "next/router";

// 링크페이지의 query가 바뀌면 새로운 리스트로 업데이트 해주는 훅
const useFetchLinks = (
  setLinkCardList: (list: LinkData[], totalCount: number) => void
) => {
  const router = useRouter();

  useEffect(() => {
    const fetchLinks = async () => {
      // 경로에 따라 API 엔드포인트 분기
      let endpoint = "/api/links";
      const params: any = {
        page: router.query.page,
        pageSize: 6,
        search: router.query.search,
      };

      if (router.pathname === "/favorite") {
        endpoint = "/api/favorites";
      }

      try {
        const res = await proxy.get(endpoint, { params });
        setLinkCardList(res.data.list, res.data.totalCount);
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };

    if (router.query) fetchLinks();
  }, [router.query, setLinkCardList, router.pathname]);
};

export default useFetchLinks;
