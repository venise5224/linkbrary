import { FolderItemType } from "@/types/modalTypes";
import FolderItem from "./FolderItem";

const FolderList = ({ list }: { list: FolderItemType[] | undefined }) => {
  return (
    <ul className="mb-6 flex flex-col gap-1 w-full">
      {list?.map((item) => <FolderItem key={item.id} item={item} />)}
    </ul>
  );
};

export default FolderList;
