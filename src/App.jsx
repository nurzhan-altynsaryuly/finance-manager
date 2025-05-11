import { Navigation } from "./layouts/Navigation/Navigation";
import { Routes, Route } from "react-router";
import Category from "./pages/Category";
import CategoryPage from "./pages/CategoryPage";
import Transactions from "./pages/Transactions";
import Dashboard from "./pages/Dashboard";
import Incomes from "./pages/Incomes";
import Expenses from "./pages/Expenses";

export default function App() {
  return (
    <div className="flex">
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:name" element={<CategoryPage />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/incomes" element={<Incomes />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>
    </div>
  );
}
