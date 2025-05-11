import { UseTransactions } from "../hooks/UseTransactions";
import { useGetCategoryQuery } from "../api/apiSlice";

export default function Transactions() {
  const [transactionsData] = UseTransactions();
  const { data, isLoading } = useGetCategoryQuery();

  if (isLoading) return <p>Loading...</p>;

  if (!transactionsData.length) {
    return <p>No transactions available.</p>;
  }

  const categoriesMap = data.reduce((acc, category) => {
    acc[category.category] = category.color;
    return acc;
  }, {});

  return (
    <div className="flex flex-col w-5/6">
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
      {transactionsData.map((item, idx) => (
        <div key={idx} className="grid grid-cols-4">
          <div
            style={{ color: item.method === "expense" ? "red" : "green" }}
            className="border-gray-500 text-center border-1 p-3"
          >
            {item.method === "expense" ? "-" + item.cash : "+" + item.cash}$
          </div>
          <div className="text-center border-1 p-3 border-gray-500">
            {item.description}
          </div>
          <div
            style={{
              backgroundColor: item.category
                ? categoriesMap[item.category] || "#ccc"
                : "#ccc",
            }}
            className="border-gray-500 p-3 text-center border-1"
          >
            {item.category || "No data"}
          </div>
          <div className="text-center border-1 p-3 border-gray-500 flex justify-center">
            <p>{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
