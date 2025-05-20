import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { useGetExpensesQuery } from "../api/apiSlice";

import usePagination from "../hooks/usePagination";

import useFilterSortSearch from "../hooks/useFilterSortSearch";

import ModalItem from "../components/ModalItem";

import { FC } from "react";
import useCategoryDelete from "../hooks/useCategoryDelete";

import Category from "../models/Category";
import Expense from "../models/Expense";
import Pagination from "../components/Pagination";

const CategoryPage: FC = () => {
  const { data, isLoading } = useGetExpensesQuery();
  const state: Category = useLocation().state;

  const expenses: Expense[] | undefined = data?.filter(
    (item) => item.category === state.category
  );

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

  const { totalPages, page, setPage, start, end } = usePagination(
    filteredData,
    14
  );
  const { modal, setModal, handleDeleteCategory } = useCategoryDelete(data);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {modal && (
        <ModalItem>
          <p className="text-white text-center text-xl font-bold mb-2">
            Do you want to delete this category?
          </p>
          <p className="text-red-400 text-center text-md">
            If you delete this category, all expenses associated with it will
            also be deleted.
          </p>
          <div className="flex justify-center gap-5 mt-5">
            <button
              className={`px-5 py-2 border-1 border-solid text-md font-['Inter'] w-max rounded-xs flex items-center transition bg-red-500 text-white hover:cursor-pointer hover:bg-red-300`}
              onClick={() =>
                handleDeleteCategory(state.id as string, state.category)
              }
            >
              Delete
            </button>
            <button
              className={`px-5 py-2 border-1 border-solid text-md font-['Inter'] w-max rounded-xs flex items-center transition bg-sky-500 text-white hover:cursor-pointer hover:bg-sky-300`}
              onClick={() => setModal(false)}
            >
              Cancel
            </button>
          </div>
        </ModalItem>
      )}
      <div className="w-5/6">
        <Link to="/category">
          <div className="mx-10 my-5 border-1 w-max px-5 rounded-xs border-gray-300 text-gray-700 hover:opacity-50">
            Back
          </div>
        </Link>
        <div className="font-['Inter'] mt-10 flex flex-col justify-center gap-1 items-center">
          <p className="text-3xl text-[#191919] text-center font-bold">
            {state.category}
          </p>
          <button
            onClick={() => setModal(true)}
            className={`px-5 py-2 border-1 border-solid text-md font-['Inter'] w-max rounded-xs flex items-center transition bg-red-500 text-white hover:cursor-pointer hover:bg-red-300`}
          >
            Delete category
          </button>
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
          filteredData.slice(start, end).map((expense: Expense) => (
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
          <Pagination pages={totalPages} page={page} setPage={setPage} />
        )}
      </div>
    </>
  );
};

export default CategoryPage;
