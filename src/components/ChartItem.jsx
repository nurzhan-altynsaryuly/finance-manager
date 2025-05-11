import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useGetCategoryQuery } from "../api/apiSlice";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export function ChartItem() {
  const { data: categories, isLoading } = useGetCategoryQuery();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (!isLoading && categories) {
      const filtered = categories.filter(
        (item) => Number(item.amount) !== 0
      );
      setCategory(filtered);
    }
  }, [isLoading, categories]);

  if (isLoading) return <p>Loading chart...</p>;
  if (!category.length) return <p>No data to display.</p>;

  const data = {
    labels: category.map((item) => item.category),
    datasets: [
      {
        data: category.map((item) => Number(item.amount)),
        backgroundColor: category.map((item) => item.color),
      },
    ],
  };

  return <Pie data={data} />;
}
