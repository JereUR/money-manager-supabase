import { supabase } from './supabase'

export const getIncomesFromSupabase = async () => {
  const user = await supabase.auth.getSession()

  if (user === null) return

  const { data: incomes, error } = await supabase
    .from('incomes')
    .select('*')
    .eq('user_id', user.id)

  return [error, incomes]
}

export const getExpensesFromSupabase = async () => {
  const user = await supabase.auth.getSession()

  if (user === null) throw new Error({ message: 'Sesión no iniciada.' })

  const { data: expenses, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', user.id)

  return [error, expenses]
}
