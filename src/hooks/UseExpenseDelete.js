import { useState } from "react";
import {
  useDeleteExpenseMutation,
  useDeleteAmountMutation,
} from "../api/apiSlice";

export const useExpenseDelete = (categories) => {
  const [deleteExpense] = useDeleteExpenseMutation();
  const [deleteAmount] = useDeleteAmountMutation();

  const [modalDelete, setModalDelete] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const confirmDelete = (item) => {
    setModalDelete(true);
    setActiveItem(item);
  };

  const handleDelete = async () => {
    const category = categories.find(
      (c) => c.category === activeItem.category
    );
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
