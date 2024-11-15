import useModalStore from "@/store/useModalStore";
import AddModal from "../AddModal";
import DeleteFolderModal from "../DeleteFolderModal";
import AddFolderModal from "../AddFolderModal";
import DeleteLinkModal from "../DeleteLinkModal";
import EditModal from "../EditModal";
import SNSModal from "../SNSModal";
import EditLink from "../EditLink";

export const ModalType = {
  AddFolderModal: "AddFolderModal",
  AddModal: "AddModal",
  DeleteFolderModal: "DeleteFolderModal",
  DeleteLinkModal: "DeleteLinkModal",
  EditModal: "EditModal",
  SNSModal: "SNSModal",
  EditLink: "EditLink",
} as const;

export type ModalKeysType = keyof typeof ModalType;

export const Modal = () => {
  const { modalType, isOpen, props } = useModalStore();
  if (!modalType || !isOpen) return null;

  switch (modalType) {
    case "AddFolderModal":
      return <AddFolderModal folderName={props.folderName || ""} />;
    case "AddModal":
      return (
        <AddModal
          list={
            props.list || [
              { id: 1, name: "코딩팁", linkCount: 7, createdAt: "" },
              { id: 2, name: "채용 사이트", linkCount: 7, createdAt: "" },
              { id: 3, name: "유용한 글", linkCount: 7, createdAt: "" },
              { id: 4, name: "나만의 장소", linkCount: 7, createdAt: "" },
            ]
          }
          link={props.link || ""}
        />
      );
    case "DeleteFolderModal":
      return (
        <DeleteFolderModal
          folderName={props.folderName || "폴더이름"}
          folderId={Number(props.folderId)}
        />
      );
    case "DeleteLinkModal":
      return (
        <DeleteLinkModal
          link={props.link || "링크"}
          linkId={Number(props.linkId)}
        />
      );
    case "EditModal":
      return (
        <EditModal
          folderName={props.folderName || "폴더이름"}
          folderId={Number(props.folderId)}
        />
      );
    case "SNSModal":
      return <SNSModal folderName={props.folderName || "폴더이름"} />;
    case "EditLink":
      return (
        <EditLink
          folderName={props.folderName || "폴더이름"}
          link={props.link || "링크"}
          linkId={Number(props.linkId)}
        />
      );
  }
};
