import { deleteLinkURL, getFavorites } from "@/lib/api/link";
import { create } from "zustand";

interface LinkCardDataType {
  id: number;
  favorite: boolean;
  url: string;
  title: string;
  imageSource: string;
  description: string;
  createdAt: string;
}

interface LinkCardStore {
  linkCardList: LinkCardDataType[];
  totalCount: number;
  setLinkCardList: (list: LinkCardDataType[]) => void;
  deleteLink: (linkId: number) => Promise<void>;
}

export const useLinkCardStore = create<LinkCardStore>((set) => ({
  linkCardList: [],
  totalCount: 0,

  setLinkCardList: (list: LinkCardDataType[]) => {
    set({ linkCardList: list, totalCount: list.length });
  },

  // 삭제 요청 보낸 후 목록 가져오기 (임시로 즐겨찾기 목록으로 구현)
  deleteLink: async (linkId: number) => {
    try {
      await deleteLinkURL(linkId);
      const res = await getFavorites();
      const updatedList = res.list;

      // 상태 업데이트
      set({ linkCardList: updatedList, totalCount: updatedList.length });
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  },
}));
