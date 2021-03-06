export interface ExpenseEntry {
  id: number;
  expenseName: string;
  value: number;
  payPeriodType?: PayPeriod;
  [key: string]: string | number | PayPeriod;
}

export interface HandleChange {
  [type: string]: string | number | PayPeriod | ExpenseEntry | ExpenseEntry[];
}

// This is how onChange is typed for some reason
export interface ISelectOnChange {
  name?: string | undefined; 
  value: unknown; 
}

interface IExpenseTag {
  id: number;
  tagName: string;
  total: number;
  identifier: string; // Color
  expenses: ExpenseEntry[];
}
