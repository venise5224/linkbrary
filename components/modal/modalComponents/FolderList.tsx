import { FolderItemType } from "@/types/modalTypes";
import FolderItemRadio from "./FolderItemRadio";

const FolderList = ({
  list,
  selectedId,
  onClick,
}: {
  list: FolderItemType[] | undefined;
  selectedId: number | null;
  onClick: (id: number) => void;
}) => {
  return (
    <ul className="mb-6 flex flex-col gap-1 w-full">
      {list?.map((item) => (
        <FolderItemRadio
          key={item.id}
          item={item}
          selectedId={selectedId}
          onClick={onClick}
        />
      ))}
    </ul>
  );
};

export default FolderList;
