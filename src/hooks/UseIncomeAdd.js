import { useState } from "react";
import { useAddIncomeMutation } from "../api/apiSlice";

export const useIncomeAdd = () => {
  const [addIncome] = useAddIncomeMutation();

  const [cash, setCash] = useState("");
  const [description, setDescription] = useState("");

  const handleAddIncome = () => {
    const income = {
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
