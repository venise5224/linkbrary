import ModalContainer from "./modalComponents/ModalContainer";

const DeleteFolderModal = () => {
  return (
    <ModalContainer
      title="폴더 삭제"
      subtitle="폴더명"
      buttonText="삭제하기"
      buttonColor="negative"
    ></ModalContainer>
  );
};
export default DeleteFolderModal;
