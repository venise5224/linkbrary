import { Switch } from "@/components/modal/modalManager/ModalManager";
import useModalStore from "@/store/useModalStore";

export default function Test() {
  const { isOpen, openModal } = useModalStore();

  return (
    <div className="m-20">
      <button type="button" onClick={() => openModal("AddFolderModal")}>
        버튼
      </button>
      <button type="button" onClick={() => openModal("AddModal")}>
        버튼
      </button>
      {isOpen && <Switch />}
    </div>
  );
}
