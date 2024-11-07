import ModalContainer from "./modalComponents/ModalContainer";
import ModalShare from "./modalComponents/ModalShare";

const EditModal = () => {
  return (
    <ModalContainer title="폴더 공유" subtitle="폴더명">
      <ModalShare />
    </ModalContainer>
  );
};
export default EditModal;
