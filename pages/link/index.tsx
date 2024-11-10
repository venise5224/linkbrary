import { GetServerSidePropsContext } from "next";
import { proxy } from "@/lib/api/axiosInstanceApi";
import { SearchInput } from "../../components/Search/SearchInput";
import { LinkData } from "@/types/linkTypes";
import { FolderData } from "@/types/folderTypes";
import Container from "@/components/Layout/Container";
import CardsLayout from "@/components/Layout/CardsLayout";
import FolderTag from "../../components/FolderTag";
import LinkCard from "../../components/LinkCard";
import AddLinkInput from "@/components/link/AddLinkInput";
import ActionButtons from "@/components/link/ActionButtons";

interface LinkPageProps {
  links: LinkData[];
  folders: FolderData[];
}
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context;

  const fetchData = async (endpoint: string) => {
    const response = await proxy.get(endpoint, {
      headers: {
        Cookie: req.headers.cookie,
      },
    });
    return response.data;
  };

  const [links, folders] = await Promise.all([
    fetchData("/api/links"),
    fetchData("/api/folders"),
  ]);

  return {
    props: {
      links: links.list || [], // 기본값 처리
      folders: folders || [], // 기본값 처리
    },
  };
};

const LinkPage = ({ links, folders }: LinkPageProps) => {
  return (
    <>
      <div className="bg-gray100 w-full h-[219px] flex justify-center items-center">
        <AddLinkInput folderList={folders} />
      </div>
      <main className="mt-[40px]">
        <Container>
          <SearchInput />
          <div className="flex justify-between mt-[40px]">
            <FolderTag list={folders} />
            <button className="w-[79px] h-[19px] text-purple100">
              폴더 추가 +
            </button>
          </div>
          <div className="flex justify-between items-center mt-[24px]">
            <h1 className="text-2xl ">유용한 글</h1>
            <ActionButtons />
          </div>
          <CardsLayout>
            {links.map((link) => (
              <LinkCard key={link.id} info={link} />
            ))}
          </CardsLayout>
        </Container>
      </main>
    </>
  );
};

export default LinkPage;
