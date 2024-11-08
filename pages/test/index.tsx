import AddFolderModal from "@/components/modal/AddFolderModal";
import { Switch } from "@/components/modal/modalManager/ModalManager";
import useModal from "@/hooks/useModal";

export default function Test() {
  const { isOpen, onOpen } = useModal("AddFolderModal");

  return (
    <div className="m-20">
      <button type="button" onClick={() => onOpen()}>
        버튼
      </button>
      {isOpen && <Switch />}
    </div>
  );
}
