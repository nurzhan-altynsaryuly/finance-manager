export default interface Expense {
  id: string;
  date: string;
  cash: number;
  description: string;
  method: "expense";
  category: string;
}
