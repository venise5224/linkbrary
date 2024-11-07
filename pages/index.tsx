import AddModal from "@/components/modal/AddModal";
interface ItemType {
  id: number;
  title: string;
  totalCount: number;
}
const list: ItemType[] = [
  { id: 1, title: "코딩팁", totalCount: 7 },
  { id: 2, title: "채용 사이트", totalCount: 7 },
  { id: 3, title: "유용한 글", totalCount: 7 },
  { id: 4, title: "나만의 장소", totalCount: 7 },
];

export default function Home() {
  return <AddModal list={list} />;
}
