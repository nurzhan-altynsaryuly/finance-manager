import { useState } from "react";
import { useDeleteCategoryMutation } from "../api/apiSlice";
import { useDeleteExpenseMutation } from "../api/apiSlice";
import { useNavigate } from "react-router-dom";
import Expense from "../models/Expense";

type UseCategoryDeleteReturn = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteCategory: (id: string, name: string | undefined) => void;
};

const useCategoryDelete = (
  data: Expense[] | undefined
): UseCategoryDeleteReturn => {
  const [deleteCategory] = useDeleteCategoryMutation();
  const [deleteExpense] = useDeleteExpenseMutation();

  const navigate = useNavigate();

  const [modal, setModal] = useState<boolean>(false);

  const handleDeleteCategory = async (id: string, name: string | undefined) => {
    await deleteCategory(id);
    const expensesToDelete: Expense[] | undefined = data?.filter(
      (item: Expense) => item.category == name
    );
    if (!expensesToDelete) return;
    for (const expense of expensesToDelete) {
      await deleteExpense(expense.id).unwrap();
    }
    navigate("/category");
    setModal(false);
  };

  return {
    modal,
    setModal,
    handleDeleteCategory,
  };
};

export default useCategoryDelete;
