import { useEffect, useState } from "react";
import { UseData } from "./UseData";

export function UseTransactions() {
  const [incomes, loadingIncomes, expenses, loadingExpenses] = UseData();
  const [transactionsData, setTransactionsData] = useState([]);

  useEffect(() => {
    if (!loadingIncomes && !loadingExpenses) {
      const data = [...incomes, ...expenses];
      const sortedData = data.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      setTransactionsData(sortedData.reverse());
    }
  }, [incomes, expenses, loadingIncomes, loadingExpenses]);

  return [transactionsData];
}
