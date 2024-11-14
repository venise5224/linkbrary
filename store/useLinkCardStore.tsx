import {
  deleteLinkURL,
  getLinks,
  putLinkFavorite,
  putLinkURL,
} from "@/lib/api/link";
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

interface UpdateLinkBody {
  url: string;
}

interface LinkCardStore {
  linkCardList: LinkCardDataType[];
  setLinkCardList: (list: LinkCardDataType[]) => void;
  updateLink: (linkId: number, body: UpdateLinkBody) => Promise<void>;
  deleteLink: (linkId: number) => Promise<void>;
  updateFavorite: (linkId: number, favorite: boolean) => Promise<void>;
}

export const useLinkCardStore = create<LinkCardStore>((set) => ({
  linkCardList: [],

  setLinkCardList: (list: LinkCardDataType[]) => {
    set({ linkCardList: list });
  },

  // 수정 요청 보낸 후 목록 가져오기
  updateLink: async (linkId: number, body: UpdateLinkBody) => {
    try {
      await putLinkURL(linkId, body);

      const res = await getLinks();
      const updatedList = res.list;

      // 상태 업데이트
      set({ linkCardList: updatedList });
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
      set({ linkCardList: updatedList });
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  },

  // 즐겨찾기 상태 업데이트
  updateFavorite: async (linkId: number, favorite: boolean) => {
    try {
      // API 호출하여 즐겨찾기 상태 업데이트
      await putLinkFavorite(linkId, { favorite });

      // 링크 목록 새로 가져와서 상태 업데이트
      const res = await getLinks();
      const updatedList = res.list;

      set({ linkCardList: updatedList });
    } catch (error) {
      console.error("즐겨찾기 상태 업데이트 중 오류 발생:", error);
    }
  },
}));
