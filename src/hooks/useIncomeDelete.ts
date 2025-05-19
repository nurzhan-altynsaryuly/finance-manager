import { useState } from "react";
import { useDeleteIncomeMutation } from "../api/apiSlice";

type UseIncomeDeleteReturn = {
  modalDelete: boolean;
  setModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteIncome: () => void;
  handleModalDelete: (id: string) => void;
};

const useIncomeDelete = (): UseIncomeDeleteReturn => {
  const [deleteIncome] = useDeleteIncomeMutation();

  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string>("");

  const handleModalDelete = (id: string) => {
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

export default useIncomeDelete;
