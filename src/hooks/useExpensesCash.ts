import { useEffect, useState } from "react";
import useData from "./useData";
import Expense from "../models/Expense";

const useExpensesCash = (): number => {
  const [, , expenses, loadingExpenses] = useData();

  const [expensesCash, setExpensesCash] = useState<number>(0);

  useEffect(() => {
    if (!loadingExpenses && expenses?.length) {
      const cash: number = expenses.reduce(
        (sum: number, item: Expense) => sum + Number(item.cash),
        0
      );
      setExpensesCash(cash);
    }
  }, [expenses, loadingExpenses]);

  return expensesCash;
};

export default useExpensesCash;
