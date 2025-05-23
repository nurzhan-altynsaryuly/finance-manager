import { useGetCategoryQuery, useAddCategoryMutation } from "../api/apiSlice";
import { FC } from "react";
import { Link } from "react-router-dom";

import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination";

import useFilterSortSearch from "../hooks/useFilterSortSearch";

import ModalItem from "../components/ModalItem";

import useCategoryAdd from "../hooks/useCategoryAdd";
import Category from "../models/Category";

const Category: FC = () => {
  const [, { isLoading: isAdding, error: addError }] = useAddCategoryMutation();
  const { data: categories, isLoading } = useGetCategoryQuery();

  const { filteredData, searchInput, setSearchInput } = useFilterSortSearch(
    categories,
    {
      enableSearch: true,
      enableSort: false,
      enableFilter: false,
      searchKey: "category",
    }
  );

  const { totalPages, page, setPage, start, end } = usePagination(
    filteredData,
    15
  );

  const {
    categoryInput,
    setCategoryInput,
    modal,
    setModal,
    handleAddCategory,
  } = useCategoryAdd(categories);

  if (isLoading) return <p>Loading categories...</p>;

  return (
    <>
      {modal && (
        <ModalItem>
          <p className="text-white text-center text-xl font-bold mb-2">
            This category already exists.
          </p>
          <div className="flex justify-center gap-5 mt-5">
            <button
              className={`px-10 py-2 border-1 border-solid text-md font-['Inter'] w-max rounded-xs flex items-center transition bg-sky-500 text-white hover:cursor-pointer hover:bg-sky-300`}
              onClick={() => setModal(false)}
            >
              Ok
            </button>
          </div>
        </ModalItem>
      )}
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
            disabled={isAdding || categoryInput.trim().length < 2}
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

        <div className="w-full flex justify-end my-5">
          {searchInput && (
            <button
              onClick={() => setSearchInput("")}
              className="mr-2 text-sm text-blue-600 underline hover:cursor-pointer"
            >
              Clear
            </button>
          )}
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="px-5 py-3 border border-gray-300 rounded-xs text-xl focus:outline-none h-15"
          />
        </div>

        <div className="w-full grid grid-cols-4 gap-10 mt-10">
          {filteredData.length ? (
            filteredData.slice(start, end).map((item) => (
              <Link
                key={item.id}
                to={`/category/${item.category.toLowerCase()}`}
                state={item}
              >
                <div
                  style={{ backgroundColor: item.color }}
                  className="text-center p-10 border w-full box-border rounded hover:opacity-50"
                >
                  <p className="text-xl font-bold text-white">
                    {item.category}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-xl text-gray-500 mt-5 text-start">No data</p>
          )}
        </div>
        {filteredData.length > 0 && totalPages != 1 && (
          <Pagination pages={totalPages} page={page} setPage={setPage} />
        )}
      </div>
    </>
  );
};

export default Category;
