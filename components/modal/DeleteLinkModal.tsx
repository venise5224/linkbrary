import ModalContainer from "./modalComponents/ModalContainer";

const DeleteLinkModal = ({ link }: { link: string }) => {
  return (
    <ModalContainer
      title="링크 삭제"
      subtitle={link}
      buttonText="삭제하기"
      buttonColor="negative"
    ></ModalContainer>
  );
};
export default DeleteLinkModal;
