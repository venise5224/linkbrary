import { create } from "zustand";

interface ModalStore {
  modalType: string | null;
  isOpen: boolean;
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
}

const useModalStore = create<ModalStore>((set) => {
  return {
    modalType: null,
    isOpen: false,
    openModal: (type: string) => set({ modalType: type, isOpen: true }),
    closeModal: () => set({ modalType: null, isOpen: false }),
  };
});
export default useModalStore;
