import { useGetIncomesQuery, useGetExpensesQuery } from "../api/apiSlice";

import Income from "../models/Income";
import Expense from "../models/Expense";

const useData = (): [
  Income[] | undefined,
  boolean,
  Expense[] | undefined,
  boolean
] => {
  const { data: incomes, isLoading: loadingIncomes } = useGetIncomesQuery();
  const { data: expenses, isLoading: loadingExpenses } = useGetExpensesQuery();

  return [incomes, loadingIncomes, expenses, loadingExpenses];
};

export default useData;
