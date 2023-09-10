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
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [session, setSession] = useState(null)

  //Session

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data)

      if (data.session !== null) {
        getUserInfo(data.session.user.id)
      }
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)

      if (session !== null) {
        getUserInfo(session.user.id)
      }
    })
  }, [])

  const getUserInfo = async (id) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)

    if (error === null) {
      setUser(data)
    }
  }

  //Incomes

  const addIncome = async (income) => {
    if (user === null) return

    const response = await addIncomeToSupabase(income)

    if (response[0] === null) {
      getIncomes()
    }
  }

  const getIncomes = async () => {
    if (user === null) return

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
    if (user === null) return

    const response = await addExpenseToSupabase(expense)

    if (response[0] === null) {
      getExpenses()
    }
  }

  const getExpenses = async () => {
    if (user === null) return

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
        session,
        user
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
