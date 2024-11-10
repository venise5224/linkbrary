import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { proxy } from "@/lib/api/axiosInstanceApi";
import { Modal } from "@/components/modal/modalManager/ModalManager";
import { useLinkCardStore } from "@/store/useLinkCardStore";
import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import CardsLayout from "@/components/Layout/CardsLayout";
import Container from "@/components/Layout/Container";
import useModalStore from "@/store/useModalStore";

interface FavoriteDataType {
  id: number;
  favorite: boolean;
  url: string;
  title: string;
  imageSource: string;
  description: string;
  createdAt: string;
}

interface FavoriteProps {
  totalCount: number;
  initialLinkCardList: FavoriteDataType[];
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // 클라이언트의 쿠키 가져오기
  const { req } = context;
  const cookies = req.headers.cookie || "";

  try {
    const res = await proxy.get("/api/favorites", {
      headers: {
        Cookie: cookies,
      },
    });

    const { list, totalCount } = res.data || { list: [], totalCount: 0 };
    return { props: { initialLinkCardList: list, totalCount } };
  } catch (error) {
    console.error("서버사이드에러", error);
    return { props: { initialLinkCardList: [], totalCount: 0 } };
  }
};

const FavoritePage = ({ initialLinkCardList, totalCount }: FavoriteProps) => {
  const { isOpen, openModal } = useModalStore();
  const { linkCardList, setLinkCardList } = useLinkCardStore();

  // 클라이언트에서 초기 목록을 설정
  useEffect(() => {
    setLinkCardList(initialLinkCardList);
  }, [initialLinkCardList, setLinkCardList]);

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
      <div className="page-title pt-[10px] md:pt-5 pb-10 md:pb-[60px] bg-gray100 text-center">
        <h2 className="text-[32px] md:text-[40px] font-semibold">
          ⭐️ 즐겨찾기
        </h2>
      </div>
      <Container>
        <CardsLayout>
          {linkCardList.length > 0
            ? linkCardList.map((favorite) => (
                <LinkCard
                  key={favorite.id}
                  id={favorite.id}
                  url={favorite.url}
                  title={favorite.title}
                  imageSource={favorite.imageSource}
                  description={favorite.description}
                  createdAt={favorite.createdAt}
                  onEdit={() => openEdit(favorite.url, favorite.id)}
                  openDelete={() => openDelete(favorite.url, favorite.id)}
                  //isFavoritePage={true}
                />
              ))
            : null}
        </CardsLayout>

        {/* 즐겨찾기 항목이 없을 때 보여줄 메시지 (공통 컴포넌트로 사용할 건지 논의 필요) */}
        {linkCardList.length === 0 && (
          <div className="flex flex-col justify-center items-center h-full p-10 bg-gray100 text-center text-gray600">
            <div className="text-2xl md:text-3xl font-semibold text-gray600">
              <span className="block mb-4">⭐️</span>
              즐겨찾기 항목이 없습니다.
            </div>
            <div className="text-sm text-purple100 mt-2">
              저장한 즐겨찾기 항목을 추가해보세요.
            </div>
          </div>
        )}
      </Container>

      {isOpen && <Modal />}
    </>
  );
};

export default FavoritePage;
