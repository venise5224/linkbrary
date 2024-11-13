import { useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { proxy } from "@/lib/api/axiosInstanceApi";
import { LinkData } from "@/types/linkTypes";
import { FolderData } from "@/types/folderTypes";
import { Modal } from "@/components/modal/modalManager/ModalManager";
import { useLinkCardStore } from "@/store/useLinkCardStore";
import { SearchInput } from "../../components/Search/SearchInput";
import CardsLayout from "@/components/Layout/CardsLayout";
import Container from "@/components/Layout/Container";
import ActionButtons from "@/components/Link/ActionButtons";
import AddLinkInput from "@/components/Link/AddLinkInput";
import SearchResultMessage from "@/components/Search/SearchResultMessage";
import useModalStore from "@/store/useModalStore";
import FolderTag from "../../components/FolderTag";
import LinkCard from "../../components/LinkCard";

interface LinkPageProps {
  linkList: LinkData[];
  folderList: FolderData[];
}

// /link 페이지 접속시에 초기렌더링 데이터(전체 폴더, 전체링크리스트)만 fetch해서 client로 전달.
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context;

  const fetchData = async (endpoint: string) => {
    const response = await proxy.get(endpoint, {
      headers: {
        Cookie: req.headers.cookie,
      },
    });
    return response.data;
  };

  const [links, folders] = await Promise.all([
    fetchData("/api/links"),
    fetchData("/api/folders"),
  ]);

  return {
    props: {
      linkList: links.list || [],
      folderList: folders || [],
    },
  };
};

const LinkPage = ({ linkList: initialLinkList, folderList }: LinkPageProps) => {
  const router = useRouter();
  const { search } = router.query;
  const { isOpen, openModal } = useModalStore();
  const { linkCardList, setLinkCardList } = useLinkCardStore();

  // 검색어 입력시 관련된 목록으로 setLinkCardList
  useEffect(() => {
    const fetchNewList = async () => {
      const res = await proxy.get("/api/links", {
        params: { search },
      });
      setLinkCardList(res.data.list);
    };
    if (search !== undefined) fetchNewList();
  }, [setLinkCardList, search]);

  // 클라이언트에서 초기 목록을 설정
  useEffect(() => {
    setLinkCardList(initialLinkList);
  }, [initialLinkList, setLinkCardList]);

  // EditLink 호출
  const openEdit = (link: string, linkId: number) => {
    openModal("EditLink", { link, linkId: linkId ?? null });
  };

  // DeleteLinkModal 호출
  const openDelete = (link: string, linkId: number) => {
    openModal("DeleteLinkModal", { link, linkId: linkId ?? null });
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
            <button className="w-[79px] h-[19px] text-purple100">
              폴더 추가 +
            </button>
          </div>
          <div className="flex justify-between items-center mt-[24px]">
            <h1 className="text-2xl ">유용한 글</h1>
            <ActionButtons />
          </div>
          <CardsLayout>
            {linkCardList.map((link) => (
              <LinkCard
                key={link.id}
                onEdit={() => openEdit(link.url, link.id)}
                openDelete={() => openDelete(link.url, link.id)}
                info={link}
              />
            ))}
          </CardsLayout>
        </Container>
        {isOpen && <Modal />}
      </main>
    </>
  );
};

export default LinkPage;
