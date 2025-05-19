import { useState } from "react";
import { useAddIncomeMutation } from "../api/apiSlice";
import Income from "../models/Income";

type UseExpenseAddReturn = {
  cash: string;
  setCash: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  handleAddIncome: () => void;
};

const useIncomeAdd = (): UseExpenseAddReturn => {
  const [addIncome] = useAddIncomeMutation();

  const [cash, setCash] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleAddIncome = () => {
    const income: Income = {
      id: Date.now().toString(36),
      date: new Date().toLocaleString("en-US"),
      cash: Number(cash),
      description,
      method: "income",
    };

    addIncome(income);
    setCash("");
    setDescription("");
  };

  return {
    cash,
    setCash,
    description,
    setDescription,
    handleAddIncome,
  };
};

export default useIncomeAdd;
