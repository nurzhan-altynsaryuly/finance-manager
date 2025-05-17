import { useState } from "react";
import { useChangeIncomeMutation } from "../api/apiSlice";

export const useIncomeEdit = () => {
  const [changeIncome] = useChangeIncomeMutation();

  const [modalChange, setModalChange] = useState(false);
  const [changingItem, setChangingItem] = useState(null);

  const startEditing = (item) => {
    setChangingItem(item);
    setModalChange(true);
  };

  const updateField = (field, value) => {
    setChangingItem((prev) => ({ ...prev, [field]: value }));
  };

  const saveChanges = () => {
    changeIncome(changingItem);
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
