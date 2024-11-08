import { SearchInput } from "../../components/Search/SearchInput";
import Container from "@/components/Layout/Container";
import CardsLayout from "@/components/Layout/CardsLayout";
import AddLinkInput from "../../components/Link/AddLinkInput";
import FolderTag from "../../components/FolderTag";
import LinkCard from "../../components/LinkCard";
import Image from "next/image";

const LinkPage = () => {
  return (
    <>
      <div className="bg-gray100 w-full h-[219px] flex justify-center items-center">
        <AddLinkInput folderId={697} />
      </div>
      <main className="mt-[40px]">
        <Container>
          <SearchInput />
          <div className="flex justify-between mt-[40px]">
            <FolderTag list={list} />
            <button className="w-[79px] h-[19px] text-purple100">
              폴더 추가 +
            </button>
          </div>
          <div className="flex justify-between items-center mt-[24px]">
            <h1 className="text-2xl ">유용한 글</h1>
            <div className="w-[192px] h-[18px] flex justify-between gap-[12px] text-gray400">
              <button className="flex items-center gap-[4px]">
                <Image
                  width={18}
                  height={18}
                  src="/icons/share.svg"
                  alt="share button"
                />
                <span>공유</span>
              </button>
              <button className="flex items-center gap-[4px]">
                <Image
                  width={18}
                  height={18}
                  src="/icons/pen.svg"
                  alt="share button"
                />
                <span>수정</span>
              </button>
              <button className="flex items-center gap-[4px]">
                <Image
                  width={18}
                  height={18}
                  src="/icons/delete.svg"
                  alt="delete button"
                />
                <span>삭제</span>
              </button>
            </div>
          </div>
          <CardsLayout>
            {list.map((link) => (
              <LinkCard key={link.id} info={link} />
            ))}
          </CardsLayout>
        </Container>
      </main>
    </>
  );
};

export default LinkPage;
