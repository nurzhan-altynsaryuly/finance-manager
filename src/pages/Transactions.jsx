import { UseTransactions } from "../hooks/UseTransactions";
import { useGetCategoryQuery } from "../api/apiSlice";
import { useEffect, useState } from "react";

export default function Transactions() {
  const [transactionsData] = UseTransactions();
  const { data, isLoading } = useGetCategoryQuery();

  const [selectCategory, setSelectCategory] = useState("all");
  const [selectSort, setSelectSort] = useState("date");
  const [input, setInput] = useState("");

  const [sortDirection, setSortDirection] = useState("desc");

  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    let filtered = [...transactionsData];

    if (selectCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectCategory);
    }

    if (input.length >= 2) {
      filtered = filtered.filter((item) =>
        item.description.toLowerCase().includes(input.toLowerCase())
      );
    }

    if (selectSort === "date") {
      filtered = filtered.sort((a, b) =>
        sortDirection === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date)
      );
    } else if (selectSort === "cash") {
      filtered = filtered.sort((a, b) =>
        sortDirection === "asc" ? a.cash - b.cash : b.cash - a.cash
      );
    }

    setDataFilter(filtered);
  }, [transactionsData, input, selectCategory, selectSort, sortDirection]);

  if (isLoading) return <p>Loading...</p>;

  if (!transactionsData.length) {
    return <p>No transactions available.</p>;
  }

  return (
    <div className="flex flex-col w-5/6">
      <p className="text-[#191919] text-center text-4xl font-bold w-full mt-15 mb-5">
        Transactions
      </p>
      <div className="w-full flex justify-end px-20 mb-5">
        <div className="flex gap-2 items-center">
          <p className="text-gray-300">Sort by</p>
          <select
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
            className="h-15 text-xl font-['Inter'] rounded-xs focus:outline-none w-max bg-white px-4 border-1 border-solid border-gray-300"
          >
            <option value="asc">↑ Asc</option>
            <option value="desc">↓ Desc</option>
          </select>
          <select
            value={selectSort}
            onChange={(e) => setSelectSort(e.target.value)}
            className=" h-15 text-xl font-['Inter'] rounded-xs focus:outline-none w-max mr-5 bg-white px-4 border-1 border-solid border-gray-300"
          >
            <option value="date">Date</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        <select
          value={selectCategory}
          onChange={(e) => setSelectCategory(e.target.value)}
          className="px-4 border-1 border-solid border-gray-300 h-15 text-xl font-['Inter'] rounded-xs focus:outline-none w-max mr-5 bg-white"
        >
          <option value="all">All</option>
          {data.map((item) => (
            <option key={item.id} value={item.category}>
              {item.category}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-5 py-3 border border-gray-300 rounded-xs text-xl focus:outline-none h-15"
        />
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
      {dataFilter.length ? (
        dataFilter.map((item, idx) => (
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
                  ? data.find((category) => category.category === item.category)
                      .color
                  : "#00ff00",
              }}
              className="border-gray-500 p-3 text-center border-1"
            >
              {item.category || "Income"}
            </div>
            <div className="text-center border-1 p-3 border-gray-500 flex justify-center">
              <p>{item.date}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-xl text-gray-500 mt-5 text-center">No data</p>
      )}
    </div>
  );
}
