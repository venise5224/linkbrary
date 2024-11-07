interface FolderData {
  id: number;
  createdAt: string;
  name: string;
  linkCount: number;
}

const FolderTag = (list: FolderData[]) => {
  const folderStyle = "py-[8px] px-[12px] border border-[#6D6AFE] rounded-md";

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
