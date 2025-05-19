import { useEffect, useState } from "react";

type UsePaginationReturn = {
  totalPages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  start: number;
  end: number;
};

const usePagination = (
  data: any[] = [],
  pageItems: number
): UsePaginationReturn => {
  let totalPages: number = Math.ceil(data.length / pageItems);
  const [page, setPage] = useState<number>(1);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(0);

  useEffect(() => {
    setStart((page - 1) * pageItems);
    setEnd(page * pageItems);
    if (page > totalPages) {
      setPage(1);
    }
  }, [totalPages, page]);

  return { totalPages, page, setPage, start, end };
};

export default usePagination;
