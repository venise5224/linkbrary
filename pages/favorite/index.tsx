import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getFavorites } from "@/lib/api/link";
import LinkCard from "@/components/LinkCard";
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context;

  // 클라이언트의 쿠키 가져오기
  const cookies = req.headers.cookie || "";

  try {
    const res = await getFavorites({
      headers: {
        Cookie: cookies, // 쿠키를 그대로 포함시킴
      },
    });
    return { props: { favoriteList: res.list || [] } };
  } catch (error) {
    console.error("서버사이드에러", error);
    return { props: { favoriteList: [] } };
  }
};

const FavoritePage = ({ favoriteList }: FavoriteProps) => {
  // 임시 보류
  // const [favoriteList, setFavoriteList] = useState<FavoriteDataType[]>([]);

  // useEffect(() => {
  //   const fetchFavorites = async () => {
  //     try {
  //       const data = await getFavorites();
  //       if (data) {
  //         setFavoriteList(data.list);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchFavorites();
  // }, []);

  return (
    <>
      <div className="page-title pt-[10px] md:pt-5 pb-10 md:pb-[60px] bg-gray100 text-center">
        <h2 className="text-[32px] md:text-[40px] font-semibold">
          ⭐️ 즐겨찾기
        </h2>
      </div>
      <Container>
        <CardsLayout>
          {favoriteList.length > 0
            ? favoriteList.map((favorite) => (
                <LinkCard
                  key={favorite.id}
                  id={favorite.id}
                  url={favorite.url}
                  title={favorite.title}
                  imageSource={favorite.imageSource}
                  description={favorite.description}
                  createdAt={favorite.createdAt}
                  isFavoritePage={true}
                />
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
      </Container>
    </>
  );
};

export default FavoritePage;
