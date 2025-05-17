import { useState } from "react";
import { useDeleteIncomeMutation } from "../api/apiSlice";

export const useIncomeDelete = () => {
  const [deleteIncome] = useDeleteIncomeMutation();

  const [modalDelete, setModalDelete] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const handleModalDelete = (id) => {
    setModalDelete(true);
    setActiveId(id);
  };

  const handleDeleteIncome = () => {
    setModalDelete(false);
    deleteIncome(activeId);
  };

  return {
    modalDelete,
    setModalDelete,
    handleDeleteIncome,
    handleModalDelete,
  };
};
