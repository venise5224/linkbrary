import ModalContainer from "./modalComponents/ModalContainer";

const DeleteFolderModal = ({ folderName }: { folderName: string }) => {
  return (
    <ModalContainer
      title="폴더 삭제"
      subtitle={folderName}
      buttonText="삭제하기"
      buttonColor="negative"
    ></ModalContainer>
  );
};
export default DeleteFolderModal;
