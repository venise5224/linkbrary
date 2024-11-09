import { FolderItemType } from "@/types/modalTypes";
import FolderItemRadio from "./FolderItemRadio";
import { useState } from "react";

const FolderList = ({ list }: { list: FolderItemType[] | undefined }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedId, setSelectedId] = useState<number[]>();
  return (
    <ul className="mb-6 flex flex-col gap-1 w-full">
      {list?.map((item) => (
        <FolderItemRadio key={item.id} item={item} isSelected={isSelected} />
      ))}
    </ul>
  );
};

export default FolderList;
