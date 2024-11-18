import { GetServerSideProps, GetServerSidePropsContext } from "next";
import axiosInstance from "@/lib/api/axiosInstanceApi";
import CardsLayout from "@/components/Layout/CardsLayout";
import Container from "@/components/Layout/Container";
import LinkCard from "@/components/Link/LinkCard";
import Pagination from "@/components/Pagination";
import useFetchLinks from "@/hooks/useFetchLinks";
import { useRouter } from "next/router";
import { useState } from "react";
import { parse } from "cookie";
import Image from "next/image";

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
  favoriteList: FavoriteDataType[];
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // 클라이언트의 쿠키 가져오기
  const { req } = context;
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;
  try {
    const res = await axiosInstance.get("/favorites?page=1&pageSize=10", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const { list, totalCount } = res.data || { list: [], totalCount: 0 };
    return { props: { favoriteList: list, totalCount } };
  } catch (error) {
    console.error("서버사이드에러", error);
    return { props: { favoriteList: [], totalCount: 0 } };
  }
};

const FavoritePage = ({ favoriteList, totalCount }: FavoriteProps) => {
  const router = useRouter();

  const [linkCardList, setLinkCardList] =
    useState<FavoriteDataType[]>(favoriteList);

  useFetchLinks(setLinkCardList);

  // 마이링크 페이지로 돌아감
  const returnButton = () => {
    router.push(`/link`);
  };

  return (
    <>
      <div className="flex justify-center items-center sm:h-[117px] h-[219px] sm:mb-5 mb-10 bg-gray100 text-center">
        <h2 className="text-[32px] md:text-[40px] font-semibold">
          ⭐️ 즐겨찾기
        </h2>
      </div>
      <Container>
        <button
          onClick={returnButton}
          className="float-right mb-5 text-purple100"
        >
          👈 마이링크로 돌아가기
        </button>
        <CardsLayout>
          {linkCardList.length > 0
            ? linkCardList.map((favorite) => (
                <LinkCard key={favorite.id} info={favorite} />
              ))
            : null}
        </CardsLayout>

        {/* 즐겨찾기 항목이 없을 때 보여줄 메시지 (공통 컴포넌트로 사용할 건지 논의 필요) */}
        {favoriteList.length === 0 && (
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
        <Pagination totalCount={totalCount} />
      </Container>
    </>
  );
};

export default FavoritePage;
