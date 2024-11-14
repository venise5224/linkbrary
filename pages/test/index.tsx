import { Modal } from "@/components/modal/modalManager/ModalManager";
import useModalStore from "@/store/useModalStore";

export default function Test() {
  const { isOpen, openModal } = useModalStore();

  return (
    <div className="m-20 w-200 flex flex-col gap-4">
      <button type="button" onClick={() => openModal("AddFolderModal")}>
        폴더 추가 버튼
      </button>
      <button
        type="button"
        onClick={() =>
          openModal("AddModal", {
            list: [
              {
                id: 687,
                createdAt: "2024-11-09T00:45:29.718Z",
                name: "1",
                linkCount: 1,
              },
              {
                id: 684,
                createdAt: "2024-11-08T22:57:45.804Z",
                name: "폴더2",
                linkCount: 0,
              },
              {
                id: 682,
                createdAt: "2024-11-08T10:08:14.650Z",
                name: "폴더1",
                linkCount: 1,
              },
            ],
            link: "https://example1.com",
          })
        }
      >
        폴더에 추가 버튼
      </button>
      <button
        type="button"
        onClick={() =>
          openModal("DeleteFolderModal", {
            folderName: "NAME",
            folderId: 700,
          })
        }
      >
        폴더 삭제 버튼
      </button>
      <button type="button" onClick={() => openModal("DeleteLinkModal")}>
        링크 삭제 버튼
      </button>
      <button
        type="button"
        onClick={() =>
          openModal("EditModal", { folderName: "NAME", folderId: 700 })
        }
      >
        폴더 이름 수정 버튼
      </button>
      <button type="button" onClick={() => openModal("SNSModal")}>
        공유 버튼
      </button>
      <button type="button" onClick={() => openModal("EditLink")}>
        링크 수정 버튼
      </button>
      {isOpen && <Modal />}
    </div>
  );
}
