import { useState } from "react";
import {
  useDeleteExpenseMutation,
  useDeleteAmountMutation,
} from "../api/apiSlice";
import Category from "../models/Category";
import Expense from "../models/Expense";

type UseExpenseDeleteReturn = {
  modalDelete: boolean;
  setModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
  confirmDelete: (item: Expense) => void;
  handleDelete: () => Promise<void>;
};

const useExpenseDelete = (categories: Category[]): UseExpenseDeleteReturn => {
  const [deleteExpense] = useDeleteExpenseMutation();
  const [deleteAmount] = useDeleteAmountMutation();

  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<Expense | undefined>(undefined);

  const confirmDelete = (item: Expense) => {
    setModalDelete(true);
    setActiveItem(item);
  };

  const handleDelete = async () => {
    if (!activeItem) return

    const category: Category | undefined = categories.find(
      (c) => c.category === activeItem.category
    );

    if (!category) return

    await deleteAmount({
      ...category,
      amount: Number(category.amount) - Number(activeItem.cash),
    });
    await deleteExpense(activeItem.id);
    setModalDelete(false);
  };

  return {
    modalDelete,
    setModalDelete,
    confirmDelete,
    handleDelete,
  };
};

export default useExpenseDelete;
