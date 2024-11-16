import { FaAngleUp } from "react-icons/fa6";

const ToTopBtn = () => {
  const handleClickToTop = () => {
    window.scrollTo({ top: 0 });
  };
  return (
    <button type="button" onClick={handleClickToTop}>
      <FaAngleUp className="purple100" />
    </button>
  );
};
export default ToTopBtn;
