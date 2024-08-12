import { AiOutlineLoading } from "react-icons/ai";

const loading = () => {
  return (
    <div className="flex h-[70vh] w-full items-center justify-center">
      <AiOutlineLoading className="animate-spin text-5xl md:text-7xl" />
    </div>
  );
};

export default loading;
