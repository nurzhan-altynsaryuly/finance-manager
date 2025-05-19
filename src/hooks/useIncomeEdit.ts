import { useState } from "react";
import { useChangeIncomeMutation } from "../api/apiSlice";
import Income from "../models/Income";

type UseIncomeEditReturn = {
  modalChange: boolean;
  setModalChange: React.Dispatch<React.SetStateAction<boolean>>;
  changingItem: Income | undefined;
  startEditing: (item: Income) => void;
  updateField: <K extends keyof Income>(field: K, value: Income[K]) => void;
  saveChanges: () => void;
};

const useIncomeEdit = (): UseIncomeEditReturn => {
  const [changeIncome] = useChangeIncomeMutation();

  const [modalChange, setModalChange] = useState<boolean>(false);
  const [changingItem, setChangingItem] = useState<Income>();

  const startEditing = (item: Income) => {
    setChangingItem(item);
    setModalChange(true);
  };

  const updateField = <K extends keyof Income>(field: K, value: Income[K]) => {
    setChangingItem((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const saveChanges = () => {
    if (!changingItem) return;
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

export default useIncomeEdit;
