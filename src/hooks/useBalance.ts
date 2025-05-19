import { useEffect, useState } from "react";
import useData from "./useData";
import Income from "../models/Income";
import Expense from "../models/Expense";

const useBalance = (): number => {
  const [incomes, loadingIncomes, expenses, loadingExpenses] = useData();
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (!loadingIncomes && !loadingExpenses) {
      const incomesCash =
        incomes?.reduce(
          (sum: number, item: Income) => sum + Number(item.cash),
          0
        ) ?? 0;

      const expensesCash =
        expenses?.reduce(
          (sum: number, item: Expense) => sum + Number(item.cash),
          0
        ) ?? 0;

      setBalance(incomesCash - expensesCash);
    }
  }, [incomes, expenses, loadingIncomes, loadingExpenses]);

  return balance;
};

export default useBalance;
