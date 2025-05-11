import { useGetIncomesQuery, useGetExpensesQuery } from "../api/apiSlice";

export function UseData() {
  const { data: incomes, isLoading: loadingIncomes } = useGetIncomesQuery();
  const { data: expenses, isLoading: loadingExpenses } = useGetExpensesQuery();

  return [incomes, loadingIncomes, expenses, loadingExpenses];
}
