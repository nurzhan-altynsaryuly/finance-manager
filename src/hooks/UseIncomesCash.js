import { useEffect, useState } from "react";
import { UseData } from "./UseData";

export function UseIncomesCash() {
  const [incomes, loadingIncomes, ,] = UseData();

  const [incomesCash, setIncomesCash] = useState(0);

  useEffect(() => {
    if (!loadingIncomes && incomes) { 
      const cash = incomes.reduce((sum, item) => sum + Number(item.cash), 0);
      setIncomesCash(cash); 
    }
  }, [incomes, loadingIncomes]);

  return [incomesCash, setIncomesCash];
}
