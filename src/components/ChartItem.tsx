import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useGetCategoryQuery } from "../api/apiSlice";
import { FC, useEffect, useState } from "react";
import Category from "../models/Category";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartItem: FC = () => {
  const { data: categories, isLoading } = useGetCategoryQuery();
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    if (!isLoading && categories) {
      const filtered: Category[] = categories.filter(
        (item) => Number(item.amount) !== 0
      );
      setCategory(filtered);
    }
  }, [isLoading, categories]);

  if (isLoading) return <p>Loading chart...</p>;
  if (!category.length) return <p>No data to display.</p>;

  const data = {
    labels: category.map((item: Category) => item.category),
    datasets: [
      {
        data: category.map((item: Category) => Number(item.amount)),
        backgroundColor: category.map((item: Category) => item.color),
      },
    ],
  };

  return <Pie data={data} />;
};

export default ChartItem;
