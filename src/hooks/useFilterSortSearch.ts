import { useMemo, useState } from "react";

type UseFilterSortSearchReturn = {
  filteredData: any[];
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  sortKey: string;
  setSortKey: React.Dispatch<React.SetStateAction<string>>;
  sortDirection: string;
  setSortDirection: React.Dispatch<React.SetStateAction<string>>;
  filterValue: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
};

type UseFilterSortSearchOptions = {
  enableSearch: boolean;
  enableSort: boolean;
  enableFilter: boolean;
  searchKey?: string;
};

const useFilterSortSearch = (
  data: any[] = [],
  {
    enableSearch = false,
    enableSort = false,
    enableFilter = false,
    searchKey = "description",
  }: UseFilterSortSearchOptions
): UseFilterSortSearchReturn => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [sortKey, setSortKey] = useState<string>("date");
  const [sortDirection, setSortDirection] = useState<string>("desc");
  const [filterValue, setFilterValue] = useState<string>("all");

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
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
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
};

export default useFilterSortSearch;
