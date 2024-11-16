import { FaAngleUp } from "react-icons/fa6";

const ToTopBtn = () => {
  const handleClickToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClickToTop}
        className="fixed bottom-20 right-10 rounded-full border bg-white opacity-70 border-purple100 size-[40px] flex items-center justify-center"
      >
        <FaAngleUp fill="purple100" />
      </button>
    </>
  );
};
export default ToTopBtn;
