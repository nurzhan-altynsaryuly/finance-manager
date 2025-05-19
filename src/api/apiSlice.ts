import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Income from "../models/Income";
import Category from "../models/Category";
import Expense from "../models/Expense";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  tagTypes: ["incomes", "expenses", "category"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (build) => ({
    getIncomes: build.query<Income[], void>({
      query: () => "incomes",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "incomes" as const, id })),
              { type: "incomes" as const, id: "LIST" },
            ]
          : [{ type: "incomes" as const, id: "LIST" }],
    }),
    getCategory: build.query<Category[], void>({
      query: () => "category",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "category" as const, id })),
              { type: "category" as const, id: "LIST" },
            ]
          : [{ type: "category" as const, id: "LIST" }],
    }),
    getExpenses: build.query<Expense[], void>({
      query: () => "expenses",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "expenses" as const, id })),
              { type: "expenses" as const, id: "LIST" },
            ]
          : [{ type: "expenses" as const, id: "LIST" }],
    }),
    addIncome: build.mutation<Income, Partial<Income>>({
      query: (body) => ({
        url: "incomes",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "incomes", id: "LIST" }],
    }),
    deleteIncome: build.mutation<void, string>({
      query: (id) => ({
        url: `incomes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "incomes", id: "LIST" }],
    }),
    addExpense: build.mutation<Expense, Partial<Expense>>({
      query: (body) => ({
        url: "expenses",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "expenses", id: "LIST" }],
    }),
    deleteExpense: build.mutation<void, string>({
      query: (id) => ({
        url: `expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "expenses", id: "LIST" }],
    }),
    addCategory: build.mutation<Category, Partial<Category>>({
      query: (body) => ({
        url: "category",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "category", id: "LIST" }],
    }),
    addAmount: build.mutation<Category, Category>({
      query: (category) => ({
        url: `category/${category.id}`,
        method: "PATCH",
        body: category,
      }),
      invalidatesTags: [{ type: "category", id: "LIST" }],
    }),
    deleteAmount: build.mutation<void, Category>({
      query: (category) => ({
        url: `category/${category.id}`,
        method: "PATCH",
        body: category,
      }),
      invalidatesTags: [{ type: "category", id: "LIST" }],
    }),
    changeIncome: build.mutation<Income, Income>({
      query: (data) => ({
        url: `incomes/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "incomes", id: "LIST" }],
    }),
    changeExpense: build.mutation<Expense, Expense>({
      query: (data) => ({
        url: `expenses/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "expenses", id: "LIST" }],
    }),
    changeAmount: build.mutation<Category, Category>({
      query: (data) => ({
        url: `category/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "expenses", id: "LIST" }],
    }),
    deleteCategory: build.mutation<void, string>({
      query: (id) => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "category", id: "LIST" }],
    }),
  }),
});

export const {
  useGetIncomesQuery,
  useGetExpensesQuery,
  useAddIncomeMutation,
  useAddExpenseMutation,
  useDeleteExpenseMutation,
  useDeleteIncomeMutation,
  useGetCategoryQuery,
  useAddCategoryMutation,
  useAddAmountMutation,
  useDeleteAmountMutation,
  useChangeIncomeMutation,
  useChangeExpenseMutation,
  useChangeAmountMutation,
  useDeleteCategoryMutation,
} = apiSlice;
