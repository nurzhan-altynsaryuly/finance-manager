import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { useGetExpensesQuery } from "../api/apiSlice";

import { UsePagination } from "../hooks/UsePagination";

import { useFilterSortSearch } from "../hooks/UseFilterSortSearch";

export default function CategoryPage() {
  const { data, isLoading } = useGetExpensesQuery();
  const state = useLocation().state;

  const expenses = data?.filter((item) => item.category === state.category);

  const {
    filteredData,
    searchInput,
    setSearchInput,
    sortKey,
    setSortKey,
    sortDirection,
    setSortDirection,
  } = useFilterSortSearch(expenses, {
    enableSearch: true,
    enableSort: true,
    enableFilter: false,
    searchKey: "description",
  });

  const [totalPages, page, setPage, start, end] = UsePagination(
    filteredData,
    14
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="w-5/6">
      <Link to="/category">
        <div className="mx-10 my-5 border-1 w-max px-5 rounded-xs border-gray-300 text-gray-700 hover:opacity-50">
          Back
        </div>
      </Link>
      <div className="text-3xl text-[#191919] text-center font-['Inter'] my-10 font-bold">
        {state.category}
      </div>
      <div className="w-full flex justify-end px-30 my-5">
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
        filteredData.slice(start, end).map((expense) => (
          <div key={expense.id} className="grid grid-cols-4">
            <div className="border-gray-500 text-center border-1 p-3 text-red-500">
              -{expense.cash}$
            </div>
            <div className="text-center border-1 p-3 border-gray-500">
              {expense.description}
            </div>
            <div
              style={{ backgroundColor: state.color }}
              className="border-gray-500 p-3 text-center border-1"
            >
              {expense.category || "Income"}
            </div>
            <div className="text-center border-1 p-3 border-gray-500 flex justify-center">
              <p>{expense.date}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center mt-10">No data</p>
      )}
      {filteredData.length > 0 && totalPages != 1 && (
        <div className="flex justify-center mt-5 flex-wrap gap-2">
          {[...Array(totalPages).keys()].map((i) => (
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
      )}
    </div>
  );
}
