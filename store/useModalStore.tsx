import { ModalKeysType } from "@/components/modal/modalManager/ModalManager";
import { ModalPropType } from "@/types/modalTypes";
import { create } from "zustand";

interface ModalStore {
  modalType: ModalKeysType | null;
  isOpen: boolean;
  props: ModalPropType;
  openModal: (type: ModalKeysType, props?: ModalStore["props"]) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStore>((set) => {
  return {
    modalType: null,
    isOpen: false,
    props: {},
    openModal: (type: ModalKeysType, props = {}) =>
      set({ modalType: type, isOpen: true, props }),
    closeModal: () => set({ modalType: null, isOpen: false, props: {} }),
  };
});
export default useModalStore;
