import BalanceItem from "../components/BalanceItem";
import { ChartItem } from "../components/ChartItem";
import ExpensesItem from "../components/ExpensesItem";
import IncomesItem from "../components/IncomesItem";
import LastTransactionItem from "../components/LastTransactionItem";
import RecentItem from "../components/RecentItem";

export default function Dashboard() {
  return (
    <>
      <div className="box-border w-5/6 px-30">
        <div className="flex">
          <div>
            <BalanceItem />
            <LastTransactionItem />
          </div>
          <div className="w-xl mt-10 ml-80">
            <ChartItem />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-10 box-border">
          <IncomesItem />
          <ExpensesItem />
          <RecentItem />
        </div>
      </div>
    </>
  );
}
