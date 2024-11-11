import { GetServerSidePropsContext } from "next";
import { proxy } from "@/lib/api/axiosInstanceApi";
import { LinkData } from "@/types/linkTypes";
import { FolderData } from "@/types/folderTypes";
import { SearchInput } from "../../components/Search/SearchInput";
import { Modal } from "@/components/modal/modalManager/ModalManager";
import { useLinkCardStore } from "@/store/useLinkCardStore";
import { useEffect } from "react";
import Container from "@/components/Layout/Container";
import CardsLayout from "@/components/Layout/CardsLayout";
import ActionButtons from "@/components/Link/ActionButtons";
import AddLinkInput from "@/components/Link/AddLinkInput";
import FolderTag from "../../components/FolderTag";
import LinkCard from "../../components/LinkCard";
import useModalStore from "@/store/useModalStore";

interface LinkPageProps {
  linkList: LinkData[];
  folderList: FolderData[];
}

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

const LinkPage = ({ linkList, folderList }: LinkPageProps) => {
  const { isOpen, openModal } = useModalStore();
  const { linkCardList, setLinkCardList } = useLinkCardStore();

  // 클라이언트에서 초기 목록을 설정
  useEffect(() => {
    setLinkCardList(linkList);
  }, [linkList, setLinkCardList]);

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
            {linkList.map((link) => (
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
