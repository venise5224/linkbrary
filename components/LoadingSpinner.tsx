import { FadeLoader } from "react-spinners";

const LoadingSpinner = ({ text }: { text?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="md:text-2xl mb-4 sm:text-lg">{text}</p>
      <FadeLoader color="#6d6afe" />
    </div>
  );
};

export default LoadingSpinner;
