import { FolderData } from "@/types/folderTypes";
import FolderTag from "../FolderTag";

interface FolderToolbarProps {
  folders: FolderData[];
}

const FolderToolbar = ({ folders }: FolderToolbarProps) => {
  return (
    <div className="flex justify-between mt-[40px]">
      {folders && <FolderTag list={folders} />}
      <button className="w-[79px] h-[19px] text-purple100">폴더 추가 +</button>
    </div>
  );
};

export default FolderToolbar;
