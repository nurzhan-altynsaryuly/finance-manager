import {
  useGetExpensesQuery,
  useAddExpenseMutation,
  useDeleteExpenseMutation,
  useGetCategoryQuery,
  useAddAmountMutation,
  useDeleteAmountMutation,
  useChangeExpenseMutation,
  useChangeAmountMutation,
} from "../api/apiSlice";
import { useEffect, useState } from "react";
import ModalItem from "../components/ModalItem";

import { UsePagination } from "../hooks/UsePagination";

export default function Expenses() {
  const { data: expenses, isLoading: loadingExpenses } = useGetExpensesQuery();
  const { data: categories, isLoading: loadingCategories } =
    useGetCategoryQuery();

  const [addExpense] = useAddExpenseMutation();
  const [deleteExpense] = useDeleteExpenseMutation();
  const [addAmount] = useAddAmountMutation();
  const [deleteAmount] = useDeleteAmountMutation();
  const [changeExpense] = useChangeExpenseMutation();
  const [changeAmount] = useChangeAmountMutation();

  const [modal, setModal] = useState(false);
  const [changingItem, setChangingItem] = useState(null);

  const [cash, setCash] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [prevCategory, setPrevCategory] = useState("");
  const [prevCash, setPrevCash] = useState("");

  const [totalPages, page, setPage, start, end] = UsePagination(expenses, 15);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategory(categories[0].category);
    }
  }, [categories]);

  const isButtonDisabled = !cash || !description || cash <= 0;

  const handleAddExpense = () => {
    const categoryToUpdate = categories.find(
      (item) => item.category === category
    );

    const updatedCategory = {
      ...categoryToUpdate,
      amount: Number(categoryToUpdate.amount) + Number(cash),
    };

    const expense = {
      id: Date.now().toString(36),
      date: new Date().toLocaleString("en-US"),
      cash: Number(cash),
      description,
      method: "expense",
      category,
    };

    addAmount(updatedCategory);
    addExpense(expense);

    setCash("");
    setDescription("");
  };

  const deleteData = (item) => {
    const categoryToUpdate = categories.find(
      (categoryItem) => categoryItem.category === item.category
    );

    const updatedCategory = {
      ...categoryToUpdate,
      amount: Number(categoryToUpdate.amount) - Number(item.cash),
    };
    deleteAmount(updatedCategory);
    deleteExpense(item.id);
  };

  const editData = (item) => {
    setChangingItem(item);
    setPrevCategory(
      categories.find((category) => category.category == item.category)
    );
    setPrevCash(item.cash);
    setModal(true);
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

  const changeCategory = (value) => {
    const newValue = {
      ...changingItem,
      category: value,
    };
    setChangingItem(newValue);
  };

  const saveData = async () => {
    changeExpense(changingItem);
    const newCategory = categories.find(
      (item) => item.category === changingItem.category
    );
    if (newCategory.category === prevCategory.category) {
      const data = {
        ...prevCategory,
        amount:
          Number(prevCategory.amount) -
          Number(prevCash) +
          Number(changingItem.cash),
      };
      changeAmount(data);
      return;
    }
    const prevCategoryData = {
      ...prevCategory,
      amount: Number(prevCategory.amount) - Number(prevCash),
    };
    changeAmount(prevCategoryData);
    const newCategoryData = {
      ...newCategory,
      amount: Number(newCategory.amount) + Number(changingItem.cash),
    };
    changeAmount(newCategoryData);
  };

  if (loadingCategories || loadingExpenses) return <p>Loading...</p>;

  if (!categories || categories.length === 0)
    return <p>Please, add some category to add expenses!</p>;

  return (
    <>
      {modal && (
        <ModalItem>
          <button
            onClick={() => setModal(false)}
            className="text-xl hover:cursor-pointer hover:opacity-50 absolute top-3 right-2"
          >
            ❌
          </button>
          <p className="text-xl text-center text-white font-['Inter'] font-bold">
            Change expense
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
          <select
            className="px-4 border-1 border-solid border-gray-300 h-15 text-xl font-['Inter'] rounded-xs focus:outline-none w-full mt-5 bg-white"
            value={changingItem.category}
            onChange={(e) => changeCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item.id} value={item.category}>
                {item.category}
              </option>
            ))}
          </select>
          <button
            onClick={saveData}
            className={`h-15 text-xl font-['Inter'] w-full mt-5 rounded-xs transitionbg-sky-900 text-white bg-sky-900 hover:bg-sky-700 hover:cursor-pointer flex justify-center items-center`}
          >
            Save
          </button>
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

        <div className="grid grid-cols-5 gap-5 mt-10">
          {!loadingExpenses &&
            expenses &&
            [...expenses]
              .slice(start, end)
              .reverse()
              .map((item) => (
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
                    onClick={() => deleteData(item)}
                    className="text-xl hover:cursor-pointer hover:opacity-50 absolute bottom-2 right-2"
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
              ))}
        </div>
        {expenses.length > 0 && totalPages != 1 && (
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
