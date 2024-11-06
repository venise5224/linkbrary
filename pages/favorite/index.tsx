import CardsLayout from "@/components/Layout/CardsLayout";
import ContentLayout from "@/components/Layout/ContentLayout";

const Favorite = () => {
  return (
    <>
      <div className="page-title pt-[10px] md:pt-5 pb-10 md:pb-[60px] bg-gray100 text-center">
        <h2 className="text-[32px] md:text-[40px] font-semibold">
          ⭐️ 즐겨찾기
        </h2>
      </div>
      <ContentLayout>
        <CardsLayout>
          {/* 카드 공통 컴포넌트 구현 예정 */}
          <div className="border border-red-800">card</div>
          <div className="border border-red-800">card</div>
          <div className="border border-red-800">card</div>
          <div className="border border-red-800">card</div>
          <div className="border border-red-800">card</div>
          <div className="border border-red-800">card</div>
        </CardsLayout>
      </ContentLayout>
    </>
  );
};

export default Favorite;
