import { useEffect, useState } from "react";
import { UseData } from "./UseData";

export function UseBalance() {
  const [incomes, loadingIncomes, expenses, loadingExpenses] = UseData();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!loadingIncomes && !loadingExpenses) {
      const incomesCash = incomes.reduce(
        (sum, item) => sum + Number(item.cash),
        0
      );
      const expensesCash = expenses.reduce(
        (sum, item) => sum + Number(item.cash),
        0
      );
      setBalance(incomesCash - expensesCash);
    }
  }, [incomes, expenses, loadingIncomes, loadingExpenses]);

  return [balance];
}
