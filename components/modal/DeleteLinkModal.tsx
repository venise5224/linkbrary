import ModalContainer from "./modalComponents/ModalContainer";

const DeleteLinkModal = () => {
  return (
    <ModalContainer
      title="링크 삭제"
      subtitle="httpw://www.abc.com"
      buttonText="삭제하기"
      buttonColor="negative"
    ></ModalContainer>
  );
};
export default DeleteLinkModal;
