import useModalStore from "@/store/useModalStore";

export default function Test() {
  const addFolderModal = useModalStore();

  return (
    <div className="m-20">
      <button type="button" onClick={() => addFolderModal.openModal}>
        버튼
      </button>
    </div>
  );
}
