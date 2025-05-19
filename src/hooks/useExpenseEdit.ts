import { useState } from "react";
import {
  useChangeExpenseMutation,
  useChangeAmountMutation,
} from "../api/apiSlice";
import Category from "../models/Category";
import Expense from "../models/Expense";

type UseExpenseEditReturn = {
  modalChange: boolean;
  setModalChange: React.Dispatch<React.SetStateAction<boolean>>;
  changingItem: Expense | undefined;
  startEditing: (item: Expense) => void;
  updateField: <K extends keyof Expense>(field: K, value: Expense[K]) => void;
  saveChanges: () => Promise<void>;
};

const useExpenseEdit = (categories: Category[]): UseExpenseEditReturn => {
  const [changeExpense] = useChangeExpenseMutation();
  const [changeAmount] = useChangeAmountMutation();

  const [modalChange, setModalChange] = useState<boolean>(false);
  const [changingItem, setChangingItem] = useState<Expense>();
  const [prevCategory, setPrevCategory] = useState<Category>();
  const [prevCash, setPrevCash] = useState<number>(0);

  const startEditing = (item: Expense) => {
    setChangingItem(item);
    setPrevCategory(categories.find((c) => c.category === item.category));
    setPrevCash(item.cash);
    setModalChange(true);
  };

  const saveChanges = async () => {
    if (!changingItem) return;
    await changeExpense(changingItem);

    const newCategory: Category | undefined = categories.find(
      (item) => item.category === changingItem.category
    );

    if (!newCategory || !prevCategory) return;

    if (newCategory.category === prevCategory.category) {
      await changeAmount({
        ...prevCategory,
        amount:
          Number(prevCategory.amount) -
          Number(prevCash) +
          Number(changingItem.cash),
      });
    } else {
      await changeAmount({
        ...prevCategory,
        amount: Number(prevCategory.amount) - Number(prevCash),
      });
      await changeAmount({
        ...newCategory,
        amount: Number(newCategory.amount) + Number(changingItem.cash),
      });
    }

    setModalChange(false);
  };

  const updateField = <K extends keyof Expense>(
    field: K,
    value: Expense[K]
  ) => {
    setChangingItem((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  return {
    modalChange,
    setModalChange,
    changingItem,
    startEditing,
    updateField,
    saveChanges,
  };
};

export default useExpenseEdit;
