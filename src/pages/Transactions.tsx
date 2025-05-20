import useTransactions from "../hooks/useTransactions";
import { useGetCategoryQuery } from "../api/apiSlice";
import usePagination from "../hooks/usePagination";

import useFilterSortSearch from "../hooks/useFilterSortSearch";
import { FC } from "react";
import Category from "../models/Category";
import Pagination from "../components/Pagination";

const Transactions: FC = () => {
  const transactionsData = useTransactions();
  const { data = [], isLoading } = useGetCategoryQuery();

  const {
    filteredData,
    searchInput,
    setSearchInput,
    sortKey,
    setSortKey,
    sortDirection,
    setSortDirection,
    filterValue,
    setFilterValue,
  } = useFilterSortSearch(transactionsData, {
    enableSearch: true,
    enableSort: true,
    enableFilter: true,
    searchKey: "description",
  });

  const { totalPages, page, setPage, start, end } = usePagination(
    filteredData,
    14
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col w-5/6">
      <p className="text-[#191919] text-center text-4xl font-bold w-full mt-15 mb-5">
        Transactions
      </p>
      <div className="w-full flex justify-end px-30 mb-5">
        <div className="flex gap-2 items-center">
          <p className="text-gray-300">Sort by</p>
          <select
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
            className="h-15 text-xl font-['Inter'] rounded-xs focus:outline-none w-max bg-white px-4 border-1 border-solid border-gray-300"
          >
            <option value="asc">↑ Asc</option>
            <option value="desc">↓ Desc</option>
          </select>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className=" h-15 text-xl font-['Inter'] rounded-xs focus:outline-none w-max mr-5 bg-white px-4 border-1 border-solid border-gray-300"
          >
            <option value="date">Date</option>
            <option value="cash">Cash</option>
          </select>
        </div>
        <select
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="px-4 border-1 border-solid border-gray-300 h-15 text-xl font-['Inter'] rounded-xs focus:outline-none w-max mr-5 bg-white"
        >
          <option value="all">All categories</option>
          <option value="incomes">Incomes</option>
          {data.map((item) => (
            <option key={item.id} value={item.category}>
              {item.category}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="px-5 py-3 border border-gray-300 rounded-xs text-xl focus:outline-none h-15"
        />
      </div>
      <div className="grid grid-cols-4">
        <div className="text-start bg-amber-400 w-full p-5 text-white font-bold border-1 border-gray-500">
          Cash
        </div>
        <div className="text-start bg-blue-500 w-full p-5 text-white font-bold border-1 border-gray-500">
          Description
        </div>
        <div className="text-start bg-violet-700 w-full p-5 text-white font-bold border-1 border-gray-500">
          Category
        </div>
        <div className="text-start bg-orange-500 w-full p-5 text-white font-bold border-1 border-gray-500">
          Date
        </div>
      </div>
      {filteredData.length ? (
        filteredData.slice(start, end).map((item) => (
          <div key={item.id} className="grid grid-cols-4">
            <div
              style={{ color: item.method === "expense" ? "red" : "green" }}
              className="border-gray-500 text-center border-1 p-3"
            >
              {item.method === "expense" ? "-" + item.cash : "+" + item.cash}$
            </div>
            <div className="text-center border-1 p-3 border-gray-500">
              {item.description}
            </div>
            <div
              style={{
                backgroundColor: item.category
                  ? data?.find(
                      (category: Category) =>
                        category.category === item.category
                    )?.color ?? "#00ff00"
                  : "#00ff00",
              }}
              className="border-gray-500 p-3 text-center border-1"
            >
              {item.category || "Income"}
            </div>
            <div className="text-center border-1 p-3 border-gray-500 flex justify-center">
              <p>{item.date}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center mt-10">No data</p>
      )}
      {filteredData.length > 0 && totalPages != 1 && (
        <Pagination pages={totalPages} page={page} setPage={setPage} />
      )}
    </div>
  );
};

export default Transactions;
