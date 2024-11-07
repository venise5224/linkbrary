import ModalContainer from "./modalComponents/ModalContainer";
import ModalInput from "./modalComponents/ModalInput";

const EditModal = ({ folderName }: { folderName: string }) => {
  return (
    <ModalContainer title="폴더 이름 변경" buttonText="변경하기">
      <ModalInput placeholder="내용 입력" name={folderName} />
    </ModalContainer>
  );
};
export default EditModal;
