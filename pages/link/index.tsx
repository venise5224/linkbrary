import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { LinkData } from "@/types/linkTypes";
import { FolderData } from "@/types/folderTypes";
import { Modal } from "@/components/modal/modalManager/ModalManager";
import { useLinkCardStore } from "@/store/useLinkCardStore";
import { SearchInput } from "../../components/Search/SearchInput";
import useModalStore from "@/store/useModalStore";
import Pagination from "@/components/Pagination";
import useFetchLinks from "@/hooks/useFetchLinks";
import AddLinkInput from "@/components/Link/AddLinkInput";
import Container from "@/components/Layout/Container";
import SearchResultMessage from "@/components/Search/SearchResultMessage";
import FolderTag from "@/components/Folder/FolderTag";
import AddFolderButton from "@/components/Folder/AddFolderButton";
import FolderActionsMenu from "@/components/Folder/FolderActionsMenu";
import CardsLayout from "@/components/Layout/CardsLayout";
import LinkCard from "@/components/Link/LinkCard";
import fetchProxy from "@/lib/api/fetchProxy";
import RenderEmptyLinkMessage from "@/components/Link/RenderEmptyLinkMessage";

interface LinkPageProps {
  linkList: LinkData[];
  folderList: FolderData[];
  totalCount: number;
}

// /link 페이지 접속시에 초기렌더링 데이터(전체 폴더, 전체링크리스트)만 fetch해서 client로 전달.
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context;

  const [links, folders] = await Promise.all([
    fetchProxy("/api/links", req),
    fetchProxy("/api/folders", req),
  ]);

  return {
    props: {
      linkList: links.list || [],
      folderList: folders || [],
      totalCount: links.totalCount || 0,
    },
  };
};

const LinkPage = ({
  linkList: initialLinkList,
  folderList: initialFolderList,
  totalCount,
}: LinkPageProps) => {
  const router = useRouter();
  const { search } = router.query;
  const { isOpen, openModal } = useModalStore();
  const { linkCardList, setLinkCardList } = useLinkCardStore();
  const [folderList, setFolderList] = useState(initialFolderList);

  // 링크페이지의 query가 바뀌면 새로운 리스트로 업데이트 해주는 훅
  useFetchLinks(router.query, setLinkCardList);

  // 클라이언트에서 초기 목록을 설정
  useEffect(() => {
    setLinkCardList(initialLinkList);
  }, [initialLinkList, setLinkCardList]);

  const handleModalOpen = (
    type: "EditLink" | "DeleteLinkModal",
    link: string,
    linkId: number
  ) => {
    openModal(type, { link, linkId });
  };

  return (
    <>
      <div className="bg-gray100 w-full h-[219px] flex justify-center items-center">
        <AddLinkInput folderList={folderList} />
      </div>
      <main className="mt-[40px]">
        <Container>
          <SearchInput />
          {search && <SearchResultMessage message={search} />}
          <div className="flex justify-between mt-[40px]">
            {folderList && <FolderTag folderList={folderList} />}
            <AddFolderButton setFolderList={setFolderList} />
          </div>
          <div className="flex justify-between items-center my-[24px]">
            <h1 className="text-2xl ">유용한 글</h1>
            <FolderActionsMenu setFolderList={setFolderList} />
          </div>
          {linkCardList ? (
            <CardsLayout>
              {linkCardList.map((link) => (
                <LinkCard
                  key={link.id}
                  openEdit={() =>
                    handleModalOpen("EditLink", link.url, link.id)
                  }
                  openDelete={() =>
                    handleModalOpen("DeleteLinkModal", link.url, link.id)
                  }
                  info={link}
                />
              ))}
            </CardsLayout>
          ) : (
            <RenderEmptyLinkMessage />
          )}
          {linkCardList && <Pagination totalCount={totalCount} />}
        </Container>
        {isOpen && <Modal />}
      </main>
    </>
  );
};

export default LinkPage;
