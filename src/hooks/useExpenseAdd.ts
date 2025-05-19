import { useState } from "react";
import { useAddExpenseMutation, useAddAmountMutation } from "../api/apiSlice";
import Category from "../models/Category";
import Expense from "../models/Expense";

type UseExpenseAddReturn = {
  cash: string;
  setCash: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  handleAddExpense: () => void;
};

const useExpenseAdd = (categories: Category[]): UseExpenseAddReturn => {
  const [addExpense] = useAddExpenseMutation();
  const [addAmount] = useAddAmountMutation();

  const [cash, setCash] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const handleAddExpense = () => {
    const categoryToUpdate = categories.find(
      (item: Category) => item.category === category
    );

    const updatedCategory: Category = {
      ...categoryToUpdate,
      amount: Number(categoryToUpdate?.amount) + Number(cash),
    };

    const expense: Expense = {
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

export default useExpenseAdd;
