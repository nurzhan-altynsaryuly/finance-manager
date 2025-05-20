import { FC } from "react";
import useData from "../hooks/useData";
import Income from "../models/Income";

const IncomesItem: FC = () => {
  const [incomes, loadingIncomes] = useData();

  if (loadingIncomes) return <p>Loading...</p>;

  return (
    <div className="p-15 bg-white rounded-xs h-auto mt-15 border-1 border-solid border-gray-300 flex flex-col items-center">
      <p className="text-3xl font-['Inter'] font-bold text-[#191919] w-max mb-5">
        Incomes
      </p>
      <div className="w-full">
        {!incomes?.length && (
          <p className="text-xl text-gray-500">No income data available</p>
        )}
        {incomes != undefined &&
          incomes
            .slice(-3)
            .reverse()
            .map((item: Income) => (
              <div key={item.id} className="flex gap-5 items-center mb-2">
                <p className="text-2xl font-['Inter'] font-bold text-center text-green-500 w-max">
                  +{item.cash}$
                </p>
                <p className="text-xl text-gray-600">{item.description}</p>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default IncomesItem;
