import { FC } from "react";

type PaginationProps = {
  pages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination: FC<PaginationProps> = ({ pages, page, setPage }) => {
  return (
    <div className="flex justify-center mt-5 flex-wrap gap-2">
      {[...Array(Math.ceil(pages)).keys()].map((i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-4 py-2 rounded hover:cursor-pointer ${
            page === i + 1
              ? "bg-[#299D91] text-white font-bold"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
