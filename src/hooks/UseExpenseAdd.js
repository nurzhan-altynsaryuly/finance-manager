import { useState } from "react";
import { useAddExpenseMutation, useAddAmountMutation } from "../api/apiSlice";

export const useExpenseAdd = (categories) => {
  const [addExpense] = useAddExpenseMutation();
  const [addAmount] = useAddAmountMutation();

  const [cash, setCash] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleAddExpense = () => {
    const categoryToUpdate = categories.find(
      (item) => item.category === category
    );

    const updatedCategory = {
      ...categoryToUpdate,
      amount: Number(categoryToUpdate.amount) + Number(cash),
    };

    const expense = {
      id: Date.now().toString(36),
      date: new Date().toLocaleString("en-US"),
      cash: Number(cash),
      description,
      method: "expense",
      category,
    };

    addAmount(updatedCategory);
    addExpense(expense);

    setCash("");
    setDescription("");
  };

  return {
    cash,
    setCash,
    description,
    setDescription,
    category,
    setCategory,
    handleAddExpense,
  };
};
