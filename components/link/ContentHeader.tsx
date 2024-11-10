import ActionButtons from "./ActionButtons";

const ContentHeader = () => {
  return (
    <div className="flex justify-between items-center mt-[24px]">
      <h1 className="text-2xl ">유용한 글</h1>
      <ActionButtons />
    </div>
  );
};

export default ContentHeader;
