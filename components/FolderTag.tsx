interface FolderData {
  id: number;
  createdAt: string;
  name: string;
  linkCount: number;
}

interface FolderTagProps {
  list: FolderData[];
}

const FolderTag = ({ list }: FolderTagProps) => {
  const folderStyle = "py-[8px] px-[12px] border border-purple-100 rounded-md";

  return (
    <div className="flex flex-wrap gap-[8px]">
      <div className={folderStyle}>전체</div>
      {list.map((folder) => (
        <div key={folder.id} className={folderStyle}>
          {folder.name}
        </div>
      ))}
    </div>
  );
};

export default FolderTag;
