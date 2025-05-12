import { UseTransactions } from "../hooks/UseTransactions";

export default function RecentItem() {
  const [transactionsData] = UseTransactions();

  if (!Array.isArray(transactionsData) || transactionsData.length === 0) {
    return (
      <div className="p-15 pb-5 bg-white rounded-xs h-auto mt-15 border-1 border-solid border-gray-300 flex flex-col items-center">
        <p className="text-3xl font-['Inter'] font-bold text-[#191919] w-max mb-5 text-center">
          Recent
        </p>
        <p className="text-xl text-gray-500">No data</p>
      </div>
    );
  }

  return (
    <div className="p-15 pb-5 bg-white rounded-xs h-auto mt-15 border-1 border-solid border-gray-300 flex flex-col items-center">
      <p className="text-3xl font-['Inter'] font-bold text-[#191919] w-max mb-5 text-center">
        Recent
      </p>
      {transactionsData.slice(0,5).map((item, idx) => {
        const isExpense = item.method === "expense";
        return (
          <div
            key={idx}
            className="flex gap-5 w-max text-xl h-max items-center justify-between"
          >
            <p className={isExpense ? "text-red-700" : "text-green-700"}>
              {isExpense ? `-${item.cash}` : `+${item.cash}`}${" "}
            </p>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-xs text-gray-500">{item.date}</p>
          </div>
        );
      })}
    </div>
  );
}
