import useModalStore from "@/store/useModalStore";
import SubmitButton from "../SubMitButton";
import ModalContainer from "./modalComponents/ModalContainer";
import { useLinkCardStore } from "@/store/useLinkCardStore";

const DeleteLinkModal = ({
  link,
  linkId,
}: {
  link: string;
  linkId: number;
}) => {
  const { closeModal } = useModalStore();
  const { deleteLink } = useLinkCardStore();

  const handleDelete = async () => {
    try {
      await deleteLink(linkId);
      closeModal();
    } catch (error) {
      console.error("Failed to delete the link:", error);
    }
  };

  return (
    <ModalContainer title="링크 삭제" subtitle={link}>
      <SubmitButton
        type="button"
        onClick={handleDelete}
        width="w-full"
        height="h-[51px]"
        color="negative"
      >
        삭제하기
      </SubmitButton>
    </ModalContainer>
  );
};
export default DeleteLinkModal;
