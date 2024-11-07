import ModalShareItem from "./ModalShareItem";

const ModalShare = () => {
  return (
    <div className="flex gap-8">
      <ModalShareItem src="/icons/Kakao.svg" text="카카오톡" bg="#FEE500" />
      <ModalShareItem src="/icons/Facebook.svg" text="페이스북" bg="#1877F2" />
      <ModalShareItem
        src="/icons/link.svg"
        text="링크 복사"
        bg="rgba(157, 157, 157, 0.04)"
        color="#6D6AFE"
      />
    </div>
  );
};
export default ModalShare;
