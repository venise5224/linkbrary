import CardsLayout from "@/components/Layout/CardsLayout";
import Container from "@/components/Layout/Container";

const Favorite = () => {
  return (
    <>
      <div className="page-title pt-[10px] md:pt-5 pb-10 md:pb-[60px] bg-gray100 text-center">
        <h2 className="text-[32px] md:text-[40px] font-semibold">
          ⭐️ 즐겨찾기
        </h2>
      </div>
      <Container>
        <CardsLayout>
          {/* 카드 공통 컴포넌트로 구현 예정 */}
          <div className="border border-red-800">card</div>
          <div className="border border-red-800">card</div>
          <div className="border border-red-800">card</div>
          <div className="border border-red-800">card</div>
          <div className="border border-red-800">card</div>
          <div className="border border-red-800">card</div>
        </CardsLayout>
      </Container>
    </>
  );
};

export default Favorite;