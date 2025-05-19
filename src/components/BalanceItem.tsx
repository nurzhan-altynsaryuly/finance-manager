import { FC } from "react";
import useBalance from "../hooks/useBalance";

const BalanceItem: FC = () => {
  const balance = useBalance();

  return (
    <>
      <div className="p-15 bg-white rounded-xs h-max mt-20 border-1 border-solid border-gray-300">
        <p className="text-3xl font-['Inter'] font-bold text-[#191919] text-center">
          Total Balance
        </p>
        <p
          className={`text-3xl font-["Inter"] font-bold text-center m-auto mt-5 w-max ${
            balance >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {balance}$
        </p>
      </div>
    </>
  );
}

export default BalanceItem
