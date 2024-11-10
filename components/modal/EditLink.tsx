import SubmitButton from "../SubMitButton";
import ModalContainer from "./modalComponents/ModalContainer";

const EditLinkModal = ({ link }: { link: string }) => {
  return (
    <ModalContainer title="링크 수정" subtitle={link}>
      <SubmitButton
        type="button"
        // onClick={handleSubmit}
        width="w-full"
        height="h-[51px]"
        color="negative"
      >
        삭제하기
      </SubmitButton>
    </ModalContainer>
  );
};
export default EditLinkModal;
