import { GetServerSideProps } from "next";
import { getFavorites } from "@/lib/api/link";
import { useEffect, useState } from "react";
import CardItem from "@/components/CardItem";
import CardsLayout from "@/components/Layout/CardsLayout";
import Container from "@/components/Layout/Container";

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

// 추후 severside 로 구현 예정
// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     const res = await getFavorites();
//     return { props: { favoriteList: res || [] } };
//   } catch (error) {
//     console.error("서버사이드에러", error);
//     return { props: { favoriteList: [] } };
//   }
// };

const FavoritePage = () => {
  const [favoriteList, setFavoriteList] = useState<FavoriteDataType[]>([]);

  useEffect(() => {
    // 비동기 데이터 호출 함수
    const fetchFavorites = async () => {
      try {
        const data = await getFavorites();
        if (data) {
          setFavoriteList(data.list);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <>
      <div className="page-title pt-[10px] md:pt-5 pb-10 md:pb-[60px] bg-gray100 text-center">
        <h2 className="text-[32px] md:text-[40px] font-semibold">
          ⭐️ 즐겨찾기
        </h2>
      </div>
      <Container>
        <CardsLayout>
          {favoriteList.length > 0 ? (
            favoriteList.map((favorite) => (
              <CardItem
                key={favorite.id} // 고유한 key 값
                id={favorite.id}
                url={favorite.url}
                title={favorite.title}
                imageSource={favorite.imageSource}
                description={favorite.description}
                createdAt={favorite.createdAt}
              />
            ))
          ) : (
            <div>즐겨찾기 항목이 없습니다.</div>
          )}
        </CardsLayout>
      </Container>
    </>
  );
};

export default FavoritePage;
