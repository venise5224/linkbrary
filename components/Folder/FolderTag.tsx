import { useRouter } from "next/router";
import { FolderListData } from "@/types/folderTypes";

const FolderTag = ({ folderList }: FolderListData) => {
  const router = useRouter();
  const { folder: selectedId } = router.query;

  const folderStyle =
    "w-[100px] h-[35px] px-[15px] text-sm whitespace-nowrap truncate border border-purple100 rounded-md hover:bg-purple100 hover:text-white";

  const handleSubmit = (id: number | string) => {
    router.push({
      pathname: router.pathname,
      query: id ? { folder: id } : {},
    });
  };

  return (
    <ul className="flex flex-wrap gap-[8px] lg:w-[80%] md:w-[80%]">
      <li>
        <button className={folderStyle} onClick={() => handleSubmit("")}>
          전체
        </button>
      </li>
      {folderList.slice(0, 8).map((folder) => (
        <li key={folder.id}>
          <button
            className={`${folderStyle} ${folder.id === Number(selectedId) && "bg-purple100 text-white"}`}
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
