import FolderItem from "./FolderItem";
interface ListType {
  id: number;
  title: string;
}
const FolderList = () => {
  const list: ListType[] = [
    { id: 1, title: "코딩팁" },
    { id: 2, title: "채용 사이트" },
    { id: 3, title: "유용한 글" },
    { id: 4, title: "나만의 장소" },
  ];

  return (
    <div>
      {list.map((item, index) => (
        <FolderItem key={item.id} title={item.title} index={index} />
      ))}
    </div>
  );
};

export default FolderList;
