import { GetServerSidePropsContext } from "next";
import { proxy } from "@/lib/api/axiosInstanceApi";
import { SearchInput } from "../../components/Search/SearchInput";
import Container from "@/components/Layout/Container";
import CardsLayout from "@/components/Layout/CardsLayout";
import AddLinkInput from "../../components/Link/AddLinkInput";
import FolderTag from "../../components/FolderTag";
import LinkCard from "../../components/LinkCard";
import ActionButtons from "@/components/Link/ActionButtons";

const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req } = context;
  const { cookie } = req.headers;

  const fetchData = async (endpoint: string) => {
    return await proxy.get(endpoint, {
      headers: {
        Cookie: cookie,
      },
    });
  };

  const links = await fetchData("/api/links");
  const folders = await fetchData("/api/folders");

  return {
    props: {
      links: links.data,
      folders: folders.data,
    },
  };
};

const LinkPage = ({ links, folders }) => {
  console.log(links);
  console.log(folders);

  return (
    <>
      <div className="bg-gray100 w-full h-[219px] flex justify-center items-center text-sm">
        {/* <AddLinkInput folders={folders} /> */}
      </div>
      <main className="mt-[40px]">
        <Container>
          <SearchInput />
          <div className="flex justify-between mt-[40px]">
            {/* <FolderTag list={list} /> */}
            <button className="w-[79px] h-[19px] text-purple100">
              폴더 추가 +
            </button>
          </div>
          <div className="flex justify-between items-center mt-[24px]">
            <h1 className="text-2xl ">유용한 글</h1>
            <ActionButtons />
          </div>
          <CardsLayout>
            {/* {links.map((link) => (
              <LinkCard key={link.id} info={link} />
            ))} */}
          </CardsLayout>
        </Container>
      </main>
    </>
  );
};

export default LinkPage;
