import {
  useGetIncomesQuery,
  useAddIncomeMutation,
  useDeleteIncomeMutation,
} from "../api/apiSlice";
import { useState } from "react";

export default function Incomes() {
  const { data, isLoading } = useGetIncomesQuery();
  const [addIncome] = useAddIncomeMutation();
  const [deleteIncome] = useDeleteIncomeMutation();

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

  const isButtonDisabled = !cash || !description || cash <= 0;

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
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

        <div className="grid grid-cols-5 gap-5 mt-10">
          {data &&
            [...data].reverse().map((item, idx) => (
              <div
                key={item.id}
                className="text-center m-auto p-10 border border-solid border-gray-300 w-full rounded-xs"
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
                  onClick={() => deleteIncome(item.id)}
                  className="text-red-600 hover:text-red-800 text-xl font-bold mt-2 hover:cursor-pointer hover:opacity-50"
                >
                  🗑️
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
