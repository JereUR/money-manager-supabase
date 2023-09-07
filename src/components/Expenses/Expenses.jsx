import styled from 'styled-components'

import { InnerLayout } from '../../styles/Layout'
import { useGlobalContext } from '../../context/globalContext'
import { useEffect } from 'react'
import Item from '../Item/Item'
import ExpenseForm from '../Form/ExpenseForm'

export default function Expenses() {
  const { expenses, getExpenses, deleteExpense, totalExpense } =
    useGlobalContext()

  useEffect(() => {
    getExpenses()
  }, [])

  return (
    <ExpensesStyled>
      <InnerLayout>
        <h1>Gastos</h1>
        <h2 className="total-expense">
          Gastos Totales: <span>${totalExpense()}</span>
        </h2>
        <div className="expense-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="expenses">
            {expenses.map((Expense) => {
              const { _id, title, amount, date, category, description } =
                Expense

              return (
                <Item
                  key={_id}
                  id={_id}
                  title={title}
                  amount={amount}
                  date={date}
                  category={category}
                  description={description}
                  indicatorColor="var(--color-delete)"
                  deleteItem={deleteExpense}
                  type="expense"
                />
              )
            })}
          </div>
        </div>
      </InnerLayout>
    </ExpensesStyled>
  )
}

const ExpensesStyled = styled.div`
  display: flex;
  overflow: auto;

  .total-expense {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: 2px solid var(--border-color);
    box-shadow: 0px 1px 15px rgba(158, 157, 157, 0.4);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;

    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-delete);
    }
  }

  .expense-content {
    display: flex;
    gap: 2rem;

    .expenses {
      flex: 1;
    }
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-color3);
    border-radius: 5px;
  }
`
