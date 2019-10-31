import React, { ReactElement, useRef, useState, useCallback, useMemo } from "react";
import { ExpenseEntry, HandleChange } from '../../types';
import ExpenseForm from './expenseForm';
import ExpenseCard from './expenseCard';
import { Button, Typography } from "@material-ui/core";

interface Expenses {
  [type: string]: {
    recurrence: number;
    expenses: ExpenseEntry[];
  }
}

interface IExpenseCard {
  tagName: string;
  expenses: ExpenseEntry[];
  [key: string]: string | ExpenseEntry[];

}

//@todo: Figure out how to update toatl spent when deleting button

const addExpenses = (expenses: Expenses): number => {
  return Reflect.ownKeys(expenses)
    .reduce((total: number, type: string | number | symbol) => {
      const expenseType = type as string;
      console.log(expenseType);
      return total + expenses[expenseType]['recurrence'] * expenses[expenseType]['expenses']
        .reduce((acc: number, expense: ExpenseEntry) => +expense.value + acc, 0);
    }, 0);
}

const ExpensePage = (): ReactElement => {

  const income = useRef(100000);
  // const [totalSpent, setTotalSpent] = useState(0);
  console.log('load');
  const basicExpenses: Expenses = {
    Year: {recurrence: 1, expenses: []},
    Monthly: {recurrence: 12, expenses: []},
    Weekly: {recurrence: 52, expenses: []},
    // @todo: should consider how to handle leap years
    Daily: { recurrence: 365, expenses: []},
  };

  const allExpenses = useRef<Expenses>(basicExpenses);
  const [expenseTypes, setExpenseTypes] = useState<IExpenseCard[]>([]);

  const totalSpent = useMemo(() => {
    let total = 0;
    expenseTypes.forEach((expenseCard: IExpenseCard) => {
      expenseCard.expenses.forEach((expense: ExpenseEntry) => {
        // value comes out as a string for some reason
        console.log(+expense.value);
        console.log(expense );
        console.log(expense.payPeriodType + '')
        console.log(+expense.value * expense.payPeriodType);
        total += +expense.value * expense.payPeriodType;
      })
    });
    return total;
  }, [expenseTypes]);

  const addCard = () => {
    let updatedExpenses = [...expenseTypes];
    updatedExpenses.push({tagName: '', expenses: []});
    setExpenseTypes(updatedExpenses);
  }

  const handleCardChange = (indexPosition: number) => {
    // Instead of passing the index position within the component pass it before and return 
    // the callback function
    return (change: HandleChange) => {
      Object.keys(change).forEach((key: string) => {
        expenseTypes[indexPosition][key] = change[key];
      });

      console.log(expenseTypes);
      setExpenseTypes(expenseTypes);
    }
  }

  console.log(expenseTypes);
  return (
    <div>
      <div>
        <Typography variant="h5">{`Total income: ${income.current}`}</Typography>
        <Typography variant="h6">{`Total spent: ${totalSpent}`}</Typography>
        <Typography variant="h6">{`Left over: ${income.current - totalSpent}`}</Typography>
      </div>
      {/* {Reflect.ownKeys(allExpenses.current).map(type => {
        return <ExpenseForm type={type as string} handleSubmit={handleSubmit} />
      })} */}
      <Button onClick={addCard} > Add Expense Type </Button>
      <div>
        {
          expenseTypes.map((type: IExpenseCard, index: number) => {
            return <ExpenseCard tagName={type.tagName} expenses={type.expenses} handleChange={handleCardChange(index)} />;
          })
        }
      </div>
    </div>
  )
}

export default ExpensePage;
