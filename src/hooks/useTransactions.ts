import { useEffect, useState } from "react";
import useData from "./useData";

const useTransactions = (): any[] => {
  const [incomes, loadingIncomes, expenses, loadingExpenses] = useData();
  const [transactionsData, setTransactionsData] = useState<any[]>([]);

  useEffect(() => {
    if (!loadingIncomes && !loadingExpenses) {
      if (!incomes || !expenses) return;
      const data: any[] = [...incomes, ...expenses];
      const sortedData = data.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      setTransactionsData(sortedData.reverse());
    }
  }, [incomes, expenses, loadingIncomes, loadingExpenses]);

  return transactionsData;
};

export default useTransactions;
