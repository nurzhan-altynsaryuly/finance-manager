import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/", label: "Dashboard", icon: "dashboard.png" },
  { path: "/category", label: "Category", icon: "category.png" },
  { path: "/transactions", label: "Transactions", icon: "transactions.png" },
  { path: "/incomes", label: "Incomes", icon: "incomes.png" },
  { path: "/expenses", label: "Expenses", icon: "expenses.png" },
];

export function Navigation() {
  const location = useLocation();

  return (
    <div className="w-1/6 h-screen bg-[#191919]">
      <p className="font-['Inter'] font-bold text-3xl text-white text-center py-20">
        Finance Manager
      </p>
      <div className="flex flex-col gap-5">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={
              location.pathname === item.path
                ? "bg-[#299D91] flex justify-left mx-5 py-2 px-5 gap-2 items-center rounded-xs"
                : "flex justify-left mx-5 py-2 px-5 gap-2 items-center rounded-xs hover:cursor-pointer hover:bg-[#299D91]"
            }
          >
            <div
              className={`bg-[url(assets/navigations/${item.icon})] h-5 w-5 bg-cover`}
            ></div>
            <p className="font-['Inter'] text-xl text-white">{item.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
