import ModalContainer from "@/components/modal/ModalContainer";
import ModalContent from "@/components/modal/ModalContent";
import ModalInput from "@/components/modal/ModalInput";
import ModalShare from "@/components/modal/ModalShare";

export default function Test() {
  return (
    <div>
      <div>테스트 페이지</div>
      <div>폴더 이름 변경</div>
      <ModalContainer title="폴더 이름 변경">
        <ModalContent buttonText="변경하기">
          <ModalInput placeholder="내용 입력" />
        </ModalContent>
      </ModalContainer>
      <div>폴더 삭제</div>
      <ModalContainer title="폴더 삭제" subtitle="폴더명">
        <ModalContent buttonText="삭제하기"></ModalContent>
      </ModalContainer>
      <div>폴더 공유</div>
      <ModalContainer title="폴더 공유" subtitle="폴더명">
        <ModalContent>
          <ModalShare />
        </ModalContent>
      </ModalContainer>
    </div>
  );
}
