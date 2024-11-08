import React from "react";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const Dropdown = ({ isOpen, onClose }: DropdownProps) => {
  return (
    <div className="absolute top-0 right-0 border border-red-800">
      <button>수정</button>
      <button>삭제</button>
    </div>
  );
};

export default Dropdown;
