import { UseTransactions } from "../hooks/UseTransactions";

export default function LastTransactionItem() {
  const [transactionsData] = UseTransactions();

  const lastTransaction = transactionsData.slice(-1)[0];

  return (
    <div className="p-15 bg-white rounded-xl h-max mt-15 drop-shadow-xl">
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
}
