import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { getExpensesFromSupabase, getIncomesFromSupabase } from '../services'

const GlobalContext = createContext()

const BASE_URL = import.meta.env.VITE_BASE_URL

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([])
  const [expenses, setExpenses] = useState([])
  const [error, setError] = useState(null)

  //Incomes

  const addIncome = async (income) => {
    await axios.post(`${BASE_URL}add-income`, income).catch((err) => {
      setError(err.response.data.message)
    })
    getIncomes()
  }

  const getIncomes = async () => {
    const response = await getIncomesFromSupabase()
    setIncomes(response.incomes)
  }

  const deleteIncome = async (id) => {
    await axios.delete(`${BASE_URL}delete-income/${id}`)
    getIncomes()
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
    await axios.post(`${BASE_URL}add-expense`, expense).catch((err) => {
      setError(err.response.data.message)
    })
    getExpenses()
  }

  const getExpenses = async () => {
    const response = await getExpensesFromSupabase()
    setExpenses(response.expenses)
  }

  const deleteExpense = async (id) => {
    await axios.delete(`${BASE_URL}delete-expense/${id}`)
    getExpenses()
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
        setError
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
