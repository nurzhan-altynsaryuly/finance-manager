import { useState } from "react";
import {
  useChangeExpenseMutation,
  useChangeAmountMutation,
} from "../api/apiSlice";

export const useExpenseEdit = (categories) => {
  const [changeExpense] = useChangeExpenseMutation();
  const [changeAmount] = useChangeAmountMutation();

  const [modalChange, setModalChange] = useState(false);
  const [changingItem, setChangingItem] = useState(null);
  const [prevCategory, setPrevCategory] = useState(null);
  const [prevCash, setPrevCash] = useState(0);

  const startEditing = (item) => {
    setChangingItem(item);
    setPrevCategory(categories.find((c) => c.category === item.category));
    setPrevCash(item.cash);
    setModalChange(true);
  };

  const saveChanges = async () => {
    await changeExpense(changingItem);

    const newCategory = categories.find(
      (item) => item.category === changingItem.category
    );

    if (newCategory.category === prevCategory.category) {
      await changeAmount({
        ...prevCategory,
        amount:
          Number(prevCategory.amount) - Number(prevCash) + Number(changingItem.cash),
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

  const updateField = (field, value) => {
    setChangingItem((prev) => ({ ...prev, [field]: value }));
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
