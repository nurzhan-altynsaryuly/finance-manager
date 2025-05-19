import { FC, useEffect } from "react";

import { useGetExpensesQuery, useGetCategoryQuery } from "../api/apiSlice";

import ModalItem from "../components/ModalItem";

import useFilterSortSearch from "../hooks/useFilterSortSearch";

import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination";

import useExpenseAdd from "../hooks/useExpenseAdd";
import useExpenseEdit from "../hooks/useExpenseEdit";
import useExpenseDelete from "../hooks/useExpenseDelete";

const Expenses: FC = () => {
  const { data: expenses, isLoading: loadingExpenses } = useGetExpensesQuery();
  const { data: categories = [], isLoading: loadingCategories } =
    useGetCategoryQuery();

  useEffect(() => {
    if (categories && categories.length > 0 && categories[0]?.category) {
      setCategory(categories[0].category);
    }
  }, [categories]);

  const {
    cash,
    setCash,
    description,
    setDescription,
    category,
    setCategory,
    handleAddExpense,
  } = useExpenseAdd(categories);

  const {
    modalChange,
    setModalChange,
    changingItem,
    startEditing,
    updateField,
    saveChanges,
  } = useExpenseEdit(categories);

  const { modalDelete, setModalDelete, confirmDelete, handleDelete } =
    useExpenseDelete(categories);

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
  } = useFilterSortSearch(expenses, {
    enableSearch: true,
    enableSort: true,
    enableFilter: true,
    searchKey: "description",
  });

  const { totalPages, page, setPage, start, end } = usePagination(
    filteredData,
    15
  );

  const isButtonDisabled = !cash || !description || cash.length <= 0;

  if (loadingCategories || loadingExpenses) return <p>Loading...</p>;

  if (!categories || categories.length === 0)
    return <p>Please, add some category to add expenses!</p>;

  return (
    <>
      {modalChange && (
        <ModalItem>
          <button
            onClick={() => setModalChange(false)}
            className="text-xl hover:cursor-pointer hover:opacity-50 absolute top-3 right-2"
          >
            ❌
          </button>
          <p className="text-xl text-center text-white font-['Inter'] font-bold">
            Change expense
          </p>
          <input
            type="number"
            value={changingItem?.cash}
            onChange={(e) => updateField("cash", Number(e.target.value))}
            className="p-5 border-1 border-solid border-gray-300 h-15 text-xl font-['Inter'] rounded-xs focus:outline-none bg-white w-full mt-5"
            placeholder="Amount"
          />
          <input
            type="text"
            value={changingItem?.description}
            onChange={(e) => updateField("description", e.target.value)}
            className="p-5 border-1 border-solid border-gray-300 h-15 text-xl font-['Inter'] rounded-xs focus:outline-none bg-white w-full mt-5"
            placeholder="Description"
          />
          <select
            className="px-4 border-1 border-solid border-gray-300 h-15 text-xl font-['Inter'] rounded-xs focus:outline-none w-full mt-5 bg-white"
            value={changingItem?.category}
            onChange={(e) => updateField("category", e.target.value)}
          >
            {categories.map((item) => (
              <option key={item.id} value={item.category}>
                {item.category}
              </option>
            ))}
          </select>
          <button
            onClick={saveChanges}
            className={`h-15 text-xl font-['Inter'] w-full mt-5 rounded-xs transitionbg-sky-900 text-white bg-sky-900 hover:bg-sky-700 hover:cursor-pointer flex justify-center items-center`}
          >
            Save
          </button>
        </ModalItem>
      )}
      {modalDelete && (
        <ModalItem>
          <p className="text-white text-center text-xl font-bold mb-2">
            Do you want to delete this expense?
          </p>
          <div className="flex justify-center gap-5 mt-5">
            <button
              className={`px-5 py-2 border-1 border-solid text-md font-['Inter'] w-max rounded-xs flex items-center transition bg-red-500 text-white hover:cursor-pointer hover:bg-red-300`}
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className={`px-5 py-2 border-1 border-solid text-md font-['Inter'] w-max rounded-xs flex items-center transition bg-sky-500 text-white hover:cursor-pointer hover:bg-sky-300`}
              onClick={() => setModalDelete(false)}
            >
              Cancel
            </button>
          </div>
        </ModalItem>
      )}
      <div className="w-5/6 px-30">
        <p className="text-[#191919] text-center text-4xl font-bold w-full mt-15">
          Expenses
        </p>
        <div className="flex gap-5 items-center mt-10 justify-center">
          <input
            type="number"
            value={cash}
            onChange={(e) => setCash(e.target.value)}
            placeholder="Amount"
            className="p-5 border-1 border-solid border-gray-300 h-15 w-xs text-xl font-['Inter'] rounded-xs focus:outline-none"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="p-5 border-1 border-solid border-gray-300 h-15 w-xs text-xl font-['Inter'] rounded-xs focus:outline-none"
          />
          <select
            className="px-4 text-gray-500 border-1 border-solid border-gray-300 h-15 w-xs text-xl font-['Inter'] rounded-xs focus:outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories && categories.length > 0 ? (
              categories.map((item) => (
                <option key={item.id} value={item.category}>
                  {item.category}
                </option>
              ))
            ) : (
              <option value="">No categories available</option>
            )}
          </select>
          <button
            onClick={handleAddExpense}
            disabled={isButtonDisabled}
            className={`p-5 border-1 border-solid border-gray-300 h-15 bg-sky-900 text-white text-xl font-['Inter'] w-max rounded-xs flex items-center transition 
            ${
              isButtonDisabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-sky-700"
            }`}
          >
            Add Expense
          </button>
        </div>

        <div className="w-full flex justify-end my-10">
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
            {categories.map((item) => (
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

        <div className="grid grid-cols-5 gap-5 mt-10">
          {!loadingExpenses && filteredData.length ? (
            [...filteredData].slice(start, end).map((item) => (
              <div
                key={item.id}
                className="text-center m-auto p-10 border border-solid border-gray-300 w-full rounded-xs relative"
              >
                <p className="text-red-600 font-['Inter'] font-bold text-xl">
                  -{item.cash}$
                </p>
                <p className="text-gray-500 text-md font-['Inter']">
                  {item.description}
                </p>
                <div
                  className="p-2 text-[10px] rounded-md h-max box-border text-neutral-600 opacity-80 w-max my-2 m-auto"
                  style={{
                    backgroundColor: categories.find(
                      (category) => category.category === item.category
                    )?.color,
                  }}
                >
                  {item.category}
                </div>
                <p className="text-gray-300 font-['Inter'] text-xs mt-1">
                  {item.date}
                </p>
                <button
                  onClick={() => confirmDelete(item)}
                  className="text-xl hover:cursor-pointer hover:opacity-50 absolute bottom-2 right-2"
                >
                  🗑️
                </button>
                <button
                  onClick={() => startEditing(item)}
                  className="text-xl hover:cursor-pointer hover:opacity-50 absolute bottom-2 right-10"
                >
                  ✏️
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-start mt-10">No data</p>
          )}
        </div>
        {filteredData.length > 0 && totalPages != 1 && (
          <Pagination pages={totalPages} page={page} setPage={setPage} />
        )}
      </div>
    </>
  );
};

export default Expenses;
