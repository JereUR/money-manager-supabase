import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import {
  addExpenseToSupabase,
  addIncomeToSupabase,
  deleteExpenseFromSupabase,
  deleteIncomeFromSupabase,
  getExpensesFromSupabase,
  getIncomesFromSupabase
} from '../services'
import { supabase } from '../services/supabase'

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([])
  const [expenses, setExpenses] = useState([])
  const [error, setError] = useState(null)
  const [session, setSession] = useState(null)

  //Session

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  //Incomes

  const addIncome = async (income) => {
    const response = await addIncomeToSupabase(income)

    if (response[0] === null) {
      getIncomes()
    }
  }

  const getIncomes = async () => {
    const response = await getIncomesFromSupabase()

    if (response[0] === null) {
      setIncomes(response[1])
    }
  }

  const deleteIncome = async (id) => {
    const response = await deleteIncomeFromSupabase(id)

    if (response[1] === null) getIncomes()
  }

  const totalIncome = () => {
    let totalInc = 0
    incomes.forEach((income) => {
      totalInc += income.amount
    })

    return totalInc
  }

  //Expenses

  const addExpense = async (expense) => {
    const response = await addExpenseToSupabase(expense)

    if (response[0] === null) {
      getExpenses()
    }
  }

  const getExpenses = async () => {
    const response = await getExpensesFromSupabase()

    if (response[0] === null) {
      setExpenses(response[1])
    }
  }

  const deleteExpense = async (id) => {
    const response = await deleteExpenseFromSupabase(id)

    if (response[1] === null) getExpenses()
  }

  const totalExpense = () => {
    let totalExp = 0
    expenses.forEach((expense) => {
      totalExp += expense.amount
    })

    return totalExp
  }

  //Total

  const totalBalance = () => {
    return totalIncome() - totalExpense()
  }

  const transactionHistory = () => {
    const history = [...incomes, ...expenses]

    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

    return history.slice(0, 3)
  }

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        totalIncome,
        addExpense,
        getExpenses,
        expenses,
        deleteExpense,
        totalExpense,
        totalBalance,
        transactionHistory,
        error,
        setError,
        session
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

GlobalProvider.propTypes = {
  children: PropTypes.object.isRequired
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
