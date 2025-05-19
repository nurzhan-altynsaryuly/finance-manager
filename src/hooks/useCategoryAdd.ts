import { useState } from "react";
import Category from "../models/Category";
import { useAddCategoryMutation } from "../api/apiSlice";

type UseCategoryAddReturn = {
  categoryInput: string;
  setCategoryInput: React.Dispatch<React.SetStateAction<string>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddCategory: () => void;
};

const useCategoryAdd = (categories?: Category[]): UseCategoryAddReturn => {
  const [addCategory] = useAddCategoryMutation();
  const [categoryInput, setCategoryInput] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);

  const generateRandomColor = (): string => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgba(${red}, ${green}, ${blue}, 0.5)`;
  };

  const handleAddCategory = async () => {
    const payload = {
      category: categoryInput.trim(),
      color: generateRandomColor(),
      amount: 0,
    };
    if (!categoryInput.trim() || categoryInput.trim().length < 2) return;
    if (
      categories?.some(
        (c) => c.category?.toLowerCase() === categoryInput.trim().toLowerCase()
      )
    ) {
      setModal(true);
      setCategoryInput("");
      return;
    }

    try {
      await addCategory(payload).unwrap();
      setCategoryInput("");
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  return {
    categoryInput,
    setCategoryInput,
    modal,
    setModal,
    handleAddCategory,
  };
};

export default useCategoryAdd;
