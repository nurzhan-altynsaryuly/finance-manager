import { useEffect, useState } from "react";

export function UsePagination(data = [], pageItems) {
  let totalPages = Math.ceil(data.length / pageItems);
  const [page, setPage] = useState(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  useEffect(() => {
    setStart((page - 1) * pageItems);
    setEnd(page * pageItems);
    if (page > totalPages) {
      setPage(1);
    }
  }, [totalPages, page]);

  return [totalPages, page, setPage, start, end];
}
