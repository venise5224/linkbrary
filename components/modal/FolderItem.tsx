import { cls } from "@/lib/utils";

const FolderItem = ({ index, title }: { index: number; title: string }) => {
  const bgColor = index % 2 === 0 ? "bg-white" : "bg-[#F0F6FF]";

  return (
    <div className={cls(bgColor, "w-full")}>
      <div>{title}</div>
    </div>
  );
};
export default FolderItem;
