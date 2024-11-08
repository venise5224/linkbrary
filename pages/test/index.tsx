import { Switch } from "@/components/modal/modalManager/ModalManager";
import useModalStore from "@/store/useModalStore";

export default function Test() {
  const { isOpen, openModal } = useModalStore();

  return (
    <div className="m-20 w-200 flex flex-col gap-4">
      <button type="button" onClick={() => openModal("AddFolderModal")}>
        폴더 추가 버튼
      </button>
      <button type="button" onClick={() => openModal("AddModal")}>
        폴더에 추가 버튼
      </button>
      <button type="button" onClick={() => openModal("DeleteFolderModal")}>
        폴더 삭제 버튼
      </button>
      <button type="button" onClick={() => openModal("DeleteLinkModal")}>
        링크 삭제 버튼
      </button>
      <button type="button" onClick={() => openModal("EditModal")}>
        폴더 이름 수정 버튼
      </button>
      <button type="button" onClick={() => openModal("SNSModal")}>
        공유 버튼
      </button>
      {isOpen && <Switch />}
    </div>
  );
}
