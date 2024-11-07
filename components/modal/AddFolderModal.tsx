import ModalContainer from "./modalComponents/ModalContainer";
import ModalInput from "./modalComponents/ModalInput";

const AddFolderModal = ({ folderName }: { folderName: string }) => {
  return (
    <ModalContainer title="폴더 추가" buttonText="추가하기">
      <ModalInput placeholder="내용 입력" name={folderName} />
    </ModalContainer>
  );
};
export default AddFolderModal;
