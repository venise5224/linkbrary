import { useRouter } from "next/router";
import { FolderListData } from "@/types/folderTypes";

const FolderTag = ({ folderList }: FolderListData) => {
  const router = useRouter();
  const { folder: currentFolderId } = router.query;

  const folderStyle =
    "py-[8px] px-[12px] border border-purple100 rounded-md hover:bg-purple100 hover:text-white";

  const handleSubmit = (id: number | string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, folder: id },
    });
  };

  return (
    <ul className="flex flex-wrap gap-[8px]">
      <li>
        <button className={folderStyle} onClick={() => handleSubmit("")}>
          전체
        </button>
      </li>
      {folderList.map((folder) => (
        <li key={folder.id}>
          <button
            className={`${folderStyle} ${folder.id === Number(currentFolderId) && "bg-purple100 text-white"}`}
            type="submit"
            onClick={() => handleSubmit(folder.id)}
          >
            {folder.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FolderTag;
