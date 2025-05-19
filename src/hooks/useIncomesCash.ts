import { useEffect, useState } from "react";
import useData from "./useData";
import Income from "../models/Income";

const useIncomesCash = (): number => {
  const [incomes = [], loadingIncomes, ,] = useData();

  const [incomesCash, setIncomesCash] = useState<number>(0);

  useEffect(() => {
    if (!loadingIncomes && incomes) {
      const cash = incomes.reduce(
        (sum: number, item: Income) => sum + Number(item.cash),
        0
      );
      setIncomesCash(cash);
    }
  }, [incomes, loadingIncomes]);

  return incomesCash;
};

export default useIncomesCash;
