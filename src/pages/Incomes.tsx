import { useGetIncomesQuery } from "../api/apiSlice";

import ModalItem from "../components/ModalItem";

import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination";

import useFilterSortSearch from "../hooks/useFilterSortSearch";

import useIncomeAdd from "../hooks/useIncomeAdd";
import useIncomeDelete from "../hooks/useIncomeDelete";
import useIncomeEdit from "../hooks/useIncomeEdit";
import { FC } from "react";
import Income from "../models/Income";

const Incomes: FC = () => {
  const { data, isLoading } = useGetIncomesQuery();

  const { cash, setCash, description, setDescription, handleAddIncome } =
    useIncomeAdd();

  const { modalDelete, setModalDelete, handleDeleteIncome, handleModalDelete } =
    useIncomeDelete();

  const {
    modalChange,
    setModalChange,
    changingItem,
    startEditing,
    updateField,
    saveChanges,
  } = useIncomeEdit();

  const {
    filteredData,
    searchInput,
    setSearchInput,
    sortKey,
    setSortKey,
    sortDirection,
    setSortDirection,
  } = useFilterSortSearch(data, {
    enableSearch: true,
    enableSort: true,
    enableFilter: false,
    searchKey: "description",
  });

  const isButtonDisabled = !cash || !description || cash.length <= 0;

  const { totalPages, page, setPage, start, end } = usePagination(
    filteredData,
    15
  );

  if (isLoading) return <p>Loading...</p>;

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
            Change income
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
            Do you want to delete this income?
          </p>
          <div className="flex justify-center gap-5 mt-5">
            <button
              className={`px-5 py-2 border-1 border-solid text-md font-['Inter'] w-max rounded-xs flex items-center transition bg-red-500 text-white hover:cursor-pointer hover:bg-red-300`}
              onClick={handleDeleteIncome}
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
          Incomes
        </p>
        <div className="flex gap-5 justify-center mt-10">
          <input
            type="number"
            value={cash}
            onChange={(e) => setCash(e.target.value)}
            className="p-5 border-1 border-solid border-gray-300 h-15 w-xs text-xl font-['Inter'] rounded-xs focus:outline-none"
            placeholder="Amount"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-5 border-1 border-solid border-gray-300 h-15 w-xs text-xl font-['Inter'] rounded-xs focus:outline-none"
            placeholder="Description"
          />
          <button
            onClick={handleAddIncome}
            disabled={isButtonDisabled}
            className={`p-5 border-1 border-solid h-15 text-xl font-['Inter'] w-max rounded-xs flex items-center transition 
    ${
      isButtonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-sky-700"
    } bg-sky-900 text-white`}
          >
            Add Income
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
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="px-5 py-3 border border-gray-300 rounded-xs text-xl focus:outline-none h-15"
          />
        </div>

        <div className="grid grid-cols-5 gap-5 mt-10">
          {filteredData.length ? (
            [...filteredData].slice(start, end).map((item: Income) => (
              <div
                key={item.id}
                className="text-center m-auto p-10 border border-solid border-gray-300 w-full rounded-xs relative"
              >
                <p className="text-green-600 font-['Inter'] font-bold text-xl">
                  +{item.cash}$
                </p>
                <p className="text-gray-500 text-md font-['Inter']">
                  {item.description}
                </p>
                <p className="text-gray-300 font-['Inter'] text-xs mt-1">
                  {item.date}
                </p>
                <button
                  onClick={() => handleModalDelete(item.id)}
                  className="text-xl mt-2 hover:cursor-pointer hover:opacity-50 absolute bottom-2 right-2"
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

export default Incomes;
