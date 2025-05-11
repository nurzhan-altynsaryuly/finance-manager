import {
  useGetExpensesQuery,
  useAddExpenseMutation,
  useDeleteExpenseMutation,
  useGetCategoryQuery,
  useAddAmountMutation,
  useDeleteAmountMutation,
} from "../api/apiSlice";
import { useEffect, useState } from "react";

export default function Expenses() {
  const { data: expenses, isLoading: loadingExpenses } = useGetExpensesQuery();
  const { data: categories, isLoading: loadingCategories } = useGetCategoryQuery();
  const [addExpense] = useAddExpenseMutation();
  const [deleteExpense] = useDeleteExpenseMutation();
  const [addAmount] = useAddAmountMutation();
  const [deleteAmount] = useDeleteAmountMutation();

  const [cash, setCash] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategory(categories[0].category);
    }
  }, [categories]);

  const isButtonDisabled = !cash || !description || cash <= 0;

  const handleAddExpense = () => {

    const categoryToUpdate = categories.find((item) => item.category === category);

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

  if (loadingCategories || loadingExpenses) return <p>Loading...</p>;

  if (!categories || categories.length === 0)
    return <p>Please, add some category to add expenses!</p>;

  return (
    <div className="w-5/6 px-30">
      <p className="text-[#191919] text-center text-4xl font-bold w-full mt-15">Expenses</p>
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
          className="text-gray-500 border-1 border-solid border-gray-300 h-15 w-xs text-xl font-['Inter'] rounded-xs focus:outline-none"
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
            ${isButtonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-sky-700"}`}
        >
          Add Expense
        </button>
      </div>

      <div className="grid grid-cols-5 gap-5 mt-10">
        {!loadingExpenses &&
          expenses &&
          [...expenses].reverse().map((item) => (
            <div
              key={item.id}
              className="text-center m-auto p-10 border border-solid border-gray-300 w-full rounded-xs relative"
            >
              <p className="text-red-600 font-['Inter'] font-bold text-xl">
                -{item.cash}$
              </p>
              <p className="text-gray-500 text-md font-['Inter']">{item.description}</p>
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
              <p className="text-gray-300 font-['Inter'] text-xs mt-1">{item.date}</p>
              <button
                onClick={() => deleteData(item)}
                className="text-xl hover:cursor-pointer hover:opacity-50 absolute bottom-2 right-2"
              >
                🗑️
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
