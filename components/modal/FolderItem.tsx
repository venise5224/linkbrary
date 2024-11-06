import { cls } from "@/lib/utils";

const FolderItem = ({ key, title }: { key: number; title: string }) => {
  return (
    <div className={cls(key / 2 === 0 ? "bg-white" : "bg-[#F0F6FF]")}>
      <div>{title}</div>
    </div>
  );
};
export default FolderItem;
