import { bindCls } from "@/lib/utils";
import { FolderItemType } from "@/types/modalTypes";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

const FolderItemRadio = ({
  item,
  isSelected,
}: {
  item: FolderItemType;
  isSelected: boolean;
}) => {
  // const bgColor = selected ? "bg-gray100" : "bg-white";

  const { name, linkCount, id } = item;

  const onClickFolder = () => {
    // setSelected(!selected);
  };
  return (
    <li
      className={bindCls(
        // bgColor,
        "w-full p-2 flex h-10 rounded-lg items-center justify-between cursor-pointer"
      )}
      onClick={onClickFolder}
    >
      <div className="flex items-center gap-2">
        <input
          value={name}
          type="radio"
          className="opacity-0"
          id={String(id)}
        />
        <label htmlFor={String(id)}>{name}</label>
        <div className="text-gray400 text-sm">{linkCount}개 링크</div>
      </div>
      {/* {selected && ( */}
      <div>
        <FaCheck className="text-purple100" />
      </div>
      {/* )} */}
    </li>
  );
};
export default FolderItemRadio;
