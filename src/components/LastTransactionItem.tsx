import { FC } from "react";
import useTransactions from "../hooks/useTransactions";

const LastTransactionItem: FC = () => {
  const transactionsData = useTransactions();

  const lastTransaction = transactionsData[0];

  return (
    <div className="p-15 bg-white rounded-xs h-max mt-15 border-1 border-solid border-gray-300">
      <p className="text-3xl font-['Inter'] font-bold text-[#191919]">
        Last Transaction
      </p>
      {lastTransaction ? (
        <p
          className={`text-3xl font-["Inter"] font-bold text-center m-auto mt-5 w-max ${
            lastTransaction.method === "income"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {lastTransaction.method === "income" ? "+" : "-"}
          {lastTransaction.cash}$
        </p>
      ) : (
        <p className="text-xl text-gray-500 mt-5">No data</p>
      )}
    </div>
  );
};

export default LastTransactionItem;
