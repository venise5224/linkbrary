import { deleteLinkURL, getLinks, putLinkURL } from "@/lib/api/link";
import { create } from "zustand";
import { LinkData } from "@/types/linkTypes";

interface UpdateLinkBody {
  url: string;
}

interface LinkCardStore {
  linkCardList: LinkData[];
  totalCount: number;
  setLinkCardList: (list: LinkData[]) => void;
  updateLink: (linkId: number, body: UpdateLinkBody) => Promise<void>;
  deleteLink: (linkId: number) => Promise<void>;
}

export const useLinkCardStore = create<LinkCardStore>((set) => ({
  linkCardList: [],
  totalCount: 0,

  setLinkCardList: (list: LinkData[]) => {
    set({ linkCardList: list, totalCount: list.length });
  },

  // 수정 요청 보낸 후 목록 가져오기
  updateLink: async (linkId: number, body: UpdateLinkBody) => {
    try {
      await putLinkURL(linkId, body);

      const res = await getLinks();
      const updatedList = res.list;

      // 상태 업데이트
      set({ linkCardList: updatedList, totalCount: updatedList.length });
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  },

  // 삭제 요청 보낸 후 목록 가져오기
  deleteLink: async (linkId: number) => {
    try {
      await deleteLinkURL(linkId);
      const res = await getLinks();
      const updatedList = res.list;

      // 상태 업데이트
      set({ linkCardList: updatedList, totalCount: updatedList.length });
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  },
}));
