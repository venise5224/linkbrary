import useModalStore from "@/store/useModalStore";
import AddModal from "../AddModal";
import DeleteFolderModal from "../DeleteFolderModal";
import AddFolderModal from "../AddFolderModal";
import DeleteLinkModal from "../DeleteLinkModal";
import EditModal from "../EditModal";
import SNSModal from "../SNSModal";

export const ModalType = {
  AddFolderModal: "AddFolderModal",
  AddModal: "AddModal",
  DeleteFolderModal: "DeleteFolderModal",
  DeleteLinkModal: "DeleteLinkModal",
  EditModal: "EditModal",
  SNSModal: "SNSModal",
} as const;

export type ModalKeysType = keyof typeof ModalType;

export const Switch = () => {
  const { modalType, isOpen, props } = useModalStore();

  if (!modalType || !isOpen) return null;

  switch (modalType) {
    case "AddFolderModal":
      return <AddFolderModal folderName={props.folderName || ""} />;
    case "AddModal":
      return <AddModal list={props.list || []} />;
    case "DeleteFolderModal":
      return <DeleteFolderModal folderName={props.folderName || ""} />;
    case "DeleteLinkModal":
      return <DeleteLinkModal link={props.link || ""} />;
    case "EditModal":
      return <EditModal folderName={props.folderName || ""} />;
    case "SNSModal":
      return <SNSModal folderName={props.folderName || ""} />;
  }
};
