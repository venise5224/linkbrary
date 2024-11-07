import { create } from "zustand";

interface IStoreState {
  showModal: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
}

const useModalStore = create<IStoreState>((set) => {
  return {
    showModal: false,
    onOpen: () => set({ showModal: true }),
    onClose: () => set({ showModal: false }),
  };
});
export default useModalStore;
