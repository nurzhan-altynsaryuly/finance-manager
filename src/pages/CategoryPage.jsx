import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { useGetExpensesQuery } from "../api/apiSlice";

export default function CategoryPage() {
  const { data, isLoading } = useGetExpensesQuery();
  const state = useLocation().state;

  if (isLoading) return <p>Loading...</p>;

  const expenses = data?.filter((item) => item.category === state.category);
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
      {expenses.length ? (
        expenses.map((expense) => (
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
    </div>
  );
}
