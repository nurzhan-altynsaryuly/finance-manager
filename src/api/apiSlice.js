import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  tagTypes: ["incomes", "expenses", "category"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (build) => ({
    getIncomes: build.query({
      query: () => "incomes",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "incomes", id })),
              { type: "incomes", id: "LIST" },
            ]
          : [{ type: "incomes", id: "LIST" }],
    }),
    getCategory: build.query({
      query: () => "category",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "category", id })),
              { type: "category", id: "LIST" },
            ]
          : [{ type: "category", id: "LIST" }],
    }),
    getExpenses: build.query({
      query: () => "expenses",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "expenses", id })),
              { type: "expenses", id: "LIST" },
            ]
          : [{ type: "expenses", id: "LIST" }],
    }),
    addIncome: build.mutation({
      query: (body) => ({
        url: "incomes",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "incomes", id: "LIST" }],
    }),
    deleteIncome: build.mutation({
      query: (id) => ({
        url: `incomes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "incomes", id: "LIST" }],
    }),
    addExpense: build.mutation({
      query: (body) => ({
        url: "expenses",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "expenses", id: "LIST" }],
    }),
    deleteExpense: build.mutation({
      query: (id) => ({
        url: `expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "expenses", id: "LIST" }],
    }),
    addCategory: build.mutation({
      query: (body) => ({
        url: "category",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "category", id: "LIST" }],
    }),
    addAmount: build.mutation({
      query: (category) => ({
        url: `category/${category.id}`,
        method: "PATCH",
        body: category,
      }),
      invalidatesTags: [{ type: "category", id: "LIST" }],
    }),
    deleteAmount: build.mutation({
      query: (category) => ({
        url: `category/${category.id}`,
        method: "PATCH",
        body: category,
      }),
      invalidatesTags: [{ type: "category", id: "LIST" }],
    }),
    changeIncome: build.mutation({
      query: (data) => ({
        url: `incomes/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "incomes", id: "LIST" }],
    }),
    changeExpense: build.mutation({
      query: (data) => ({
        url: `expenses/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "expenses", id: "LIST" }],
    }),
    changeAmount: build.mutation({
      query: (data) => ({
        url: `category/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "expenses", id: "LIST" }],
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
} = apiSlice;
