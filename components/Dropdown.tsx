import React from "react";

interface DropdownProps {
  onEdit?: () => void;
  openDelete?: () => void;
}

const Dropdown = ({ onEdit, openDelete }: DropdownProps) => {
  const buttonStyle =
    "block w-full py-2 text-sm hover:bg-gray200 hover:text-purple100";

  return (
    <div className="absolute top-[17px] right-0 flex flex-col gap-[2px] min-w-[100px] bg-white shadow-lg rounded">
      <button className={buttonStyle} onClick={onEdit}>
        수정하기
      </button>
      <button className={buttonStyle} onClick={openDelete}>
        삭제하기
      </button>
    </div>
  );
};

export default Dropdown;
