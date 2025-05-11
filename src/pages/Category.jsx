import { useGetCategoryQuery, useAddCategoryMutation } from "../api/apiSlice";
import { useState } from "react";
import { Link } from "react-router";

export default function Category() {
  const [categoryInput, setCategoryInput] = useState("");
  const [addCategory, { isLoading: isAdding, error: addError }] =
    useAddCategoryMutation();
  const { data: categories, isLoading } = useGetCategoryQuery();

  const handleAddCategory = async () => {
    const generateRandomColor = () => {
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);
      return `rgba(${red}, ${green}, ${blue}, 0.5)`;
    };

    const payload = {
      category: categoryInput.trim(),
      color: generateRandomColor(),
      amount: "0",
    };

    try {
      await addCategory(payload).unwrap();
      setCategoryInput("");
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  if (isLoading) return <p>Loading categories...</p>;

  return (
    <div className="w-5/6 px-30 pb-15">
      <p className="text-[#191919] text-center text-4xl font-bold w-full mt-15">
        Category
      </p>

      <div className="flex gap-5 mt-10 justify-center">
        <input
          type="text"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          placeholder="Type new category"
          className="px-5 py-3 border border-gray-300 rounded-xs text-xl focus:outline-none h-15"
        />
        <button
          onClick={handleAddCategory}
          disabled={isAdding || categoryInput.length < 2}
          className={`px-5 py-3 h-15 bg-sky-900 text-white text-xl rounded-xs flex items-center transition 
    ${
      categoryInput.length < 2
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-sky-700"
    }`}
        >
          {isAdding ? "Adding..." : "Add Category"}
        </button>
      </div>

      {addError && (
        <p className="text-center text-xl text-red-600 mt-2">
          Error adding category. Please try again.
        </p>
      )}

      <div className="w-full grid grid-cols-4 gap-10 mt-10">
        {categories?.map((item) => (
          <Link
            key={item.id}
            to={`/category/${item.category.toLowerCase()}`}
            state={item}
          >
            <div
              style={{ backgroundColor: item.color }}
              className="text-center p-10 border w-full box-border rounded hover:opacity-50"
            >
              <p className="text-xl font-bold text-white">{item.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
