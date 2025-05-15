import { useMemo, useState } from "react";

export function useFilterSortSearch(
  data = [],
  {
    enableSearch = false,
    enableSort = false,
    enableFilter = false,
    searchKey = "description",
  }
) {
  const [searchInput, setSearchInput] = useState("");
  const [sortKey, setSortKey] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filterValue, setFilterValue] = useState("all");

  const result = useMemo(() => {
    let filtered = [...data];

    if (enableFilter && filterValue !== "all") {
      filtered = filtered.filter((item) => item.category === filterValue);
    }

    if (enableSearch && searchInput.length >= 2) {
      if (searchKey == "description") {
        filtered = filtered.filter((item) =>
          item.description.toLowerCase().includes(searchInput.toLowerCase())
        );
      } else if (searchKey == "category") {
        filtered = filtered.filter((item) =>
          item.category.toLowerCase().includes(searchInput.toLowerCase())
        );
      }
    }

    if (enableSort && sortKey === "date") {
      filtered = filtered.sort((a, b) =>
        sortDirection === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date)
      );
    } else if (sortKey === "cash") {
      filtered = filtered.sort((a, b) =>
        sortDirection === "asc" ? a.cash - b.cash : b.cash - a.cash
      );
    }

    return filtered;
  }, [data, searchInput, filterValue, sortKey, sortDirection]);

  return {
    filteredData: result,
    searchInput,
    setSearchInput,
    sortKey,
    setSortKey,
    sortDirection,
    setSortDirection,
    filterValue,
    setFilterValue,
  };
}
