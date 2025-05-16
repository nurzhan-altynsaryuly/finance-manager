import {
  useGetIncomesQuery,
  useAddIncomeMutation,
  useDeleteIncomeMutation,
  useChangeIncomeMutation,
} from "../api/apiSlice";
import { useState } from "react";
import ModalItem from "../components/ModalItem";
import { UsePagination } from "../hooks/UsePagination";

import { useFilterSortSearch } from "../hooks/UseFilterSortSearch";

export default function Incomes() {
  const { data, isLoading } = useGetIncomesQuery();

  const [addIncome] = useAddIncomeMutation();
  const [deleteIncome] = useDeleteIncomeMutation();
  const [changeIncome] = useChangeIncomeMutation();

  const [modalChange, setModalChange] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [changingItem, setChangingItem] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const [cash, setCash] = useState("");
  const [description, setDescription] = useState("");

  const handleAddIncome = () => {
    const income = {
      id: Date.now().toString(36),
      date: new Date().toLocaleString("en-US"),
      cash: Number(cash),
      description,
      method: "income",
    };

    addIncome(income);
    setCash("");
    setDescription("");
  };

  const editData = (item) => {
    setChangingItem(item);
    setModalChange(true);
  };

  const changeCash = (value) => {
    const newValue = {
      ...changingItem,
      cash: value,
    };
    setChangingItem(newValue);
  };

  const changeDescription = (value) => {
    const newValue = {
      ...changingItem,
      description: value,
    };
    setChangingItem(newValue);
  };

  const saveData = () => {
    changeIncome(changingItem);
  };

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

  const isButtonDisabled = !cash || !description || cash <= 0;

  const [totalPages, page, setPage, start, end] = UsePagination(
    filteredData,
    15
  );

  const handleModalDelete = (id) => {
    setModalDelete(true);
    setActiveId(id);
  };

  const handleDeleteIncome = () => {
    setModalDelete(false);
    deleteIncome(activeId);
  };

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
            Change Income
          </p>
          <input
            type="number"
            value={changingItem.cash}
            onChange={(e) => changeCash(e.target.value)}
            className="p-5 border-1 border-solid border-gray-300 h-15 text-xl font-['Inter'] rounded-xs focus:outline-none bg-white w-full mt-5"
            placeholder="Amount"
          />
          <input
            type="text"
            value={changingItem.description}
            onChange={(e) => changeDescription(e.target.value)}
            className="p-5 border-1 border-solid border-gray-300 h-15 text-xl font-['Inter'] rounded-xs focus:outline-none bg-white w-full mt-5"
            placeholder="Description"
          />
          <button
            onClick={saveData}
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
            [...filteredData].slice(start, end).map((item, idx) => (
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
                  onClick={() => editData(item)}
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
    </>
  );
}
