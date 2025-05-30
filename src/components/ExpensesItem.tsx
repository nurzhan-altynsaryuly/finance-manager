import useData from "../hooks/useData";
import { useGetCategoryQuery } from "../api/apiSlice";
import { FC } from "react";
import Expense from "../models/Expense";
import Category from "../models/Category";

const ExpensesItem: FC = () => {
  const [, , expenses, loadingExpenses] = useData();
  const { data, isLoading } = useGetCategoryQuery();

  if (isLoading || loadingExpenses) return <p>Loading...</p>;

  if (!expenses?.length) {
    return (
      <div className="p-15 bg-white rounded-xs h-auto mt-15 border-1 border-solid border-gray-300 flex flex-col items-center">
        <p className="text-3xl font-['Inter'] font-bold text-[#191919] w-max mb-5">
          Expenses
        </p>
        <p className="text-xl text-gray-500">No data</p>
      </div>
    );
  }

  return (
    <div className="p-15 bg-white rounded-xs h-auto mt-15 border-1 border-solid border-gray-300 flex flex-col items-center">
      <p className="text-3xl font-['Inter'] font-bold text-[#191919] w-max mb-5">
        Expenses
      </p>
      <div className="w-max">
        {expenses
          .slice(-3)
          .reverse()
          .map((item: Expense) => {
            const category = data?.find(
              (categoryItem: Category) => categoryItem.category === item.category
            );

            return (
              <div
                key={item.id}
                className="flex gap-5 items-center mb-2 justify-between"
              >
                <p className="text-2xl font-['Inter'] font-bold text-center text-red-500 w-max">
                  -{item.cash}$
                </p>
                <p className="text-xl text-gray-500">{item.description}</p>
                <div
                  className="p-2 text-[10px] rounded-md h-max box-border text-neutral-600 opacity-80"
                  style={{
                    backgroundColor: category?.color || "#ccc",
                  }}
                >
                  {category?.category || "Unknown category"}
                </div>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ExpensesItem;
