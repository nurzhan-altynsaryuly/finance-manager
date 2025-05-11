import { useEffect, useState } from "react";
import { UseData } from "./UseData";

export function UseExpensesCash() {
  const [, , expenses, loadingExpenses] = UseData();

  const [expensesCash, setExpensesCash] = useState(0);

  useEffect(() => {
    if (!loadingExpenses && expenses.length) {
      const cash = expenses.reduce((sum, item) => sum + Number(item.cash), 0);
      setExpensesCash(cash);
    }
  }, [expenses, loadingExpenses]);

  return [expensesCash, setExpensesCash];
}
