import useModalStore from "@/store/useModalStore";

const useModal = (type: string) => {
  const { modalType, isOpen, openModal, closeModal } = useModalStore();
  return {
    isOpen: modalType === type && isOpen,
    onOpen: () => openModal(type),
    onClose: () => closeModal,
  };
};

export default useModal;
