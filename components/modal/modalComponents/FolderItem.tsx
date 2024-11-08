import { cls } from "@/lib/utils";
import { FolderItemType } from "@/types/modalTypes";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

const FolderItem = ({ item }: { item: FolderItemType }) => {
  const [selected, setSelected] = useState(false);

  const bgColor = selected ? "bg-gray100" : "bg-white";

  const { title, totalCount } = item;

  const onClickFolder = () => {
    setSelected(!selected);
  };
  return (
    <li
      className={cls(
        bgColor,
        "w-full p-2 flex h-10 rounded-lg items-center justify-between"
      )}
      onClick={onClickFolder}
    >
      <div className="flex items-center gap-2">
        <div
          className={cls(
            "text-base",
            selected ? "text-purple100" : "text-black300"
          )}
        >
          {title}
        </div>
        <div className="text-gray400 text-sm">{totalCount}개 링크</div>
      </div>
      {selected && (
        <div>
          <FaCheck className="text-purple100" />
        </div>
      )}
    </li>
  );
};
export default FolderItem;
