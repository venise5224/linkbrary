import SubmitButton from "../SubMitButton";
import ModalContainer from "./modalComponents/ModalContainer";

const DeleteLinkModal = ({ link }: { link: string }) => {
  return (
    <ModalContainer title="링크 삭제" subtitle={link}>
      {" "}
      <SubmitButton
        type="button"
        // onClick={handleSubmit}
        width="w-full"
        height="h-[51px] "
        color="negative"
      >
        삭제하기
      </SubmitButton>
    </ModalContainer>
  );
};
export default DeleteLinkModal;
