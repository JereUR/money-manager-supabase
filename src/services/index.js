import { supabase } from './supabase'

export const getUserFromSupabase = async () => {
  return await supabase.auth.getUser()
}

export const getIncomesFromSupabase = async () => {
  const user = await getUserFromSupabase()

  if (user === null) return

  const { data: incomes, error } = await supabase
    .from('incomes')
    .select('*')
    .eq('user_id', user.data.user.id)

  return [error, incomes]
}

export const getExpensesFromSupabase = async () => {
  const user = await getUserFromSupabase()

  if (user === null) throw new Error({ message: 'Sesión no iniciada.' })

  const { data: expenses, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', user.data.user.id)

  return [error, expenses]
}

export const signInWithGoogle = async () => {
  const { user, error } = await supabase.auth.signInWithOAuth({
    provider: 'google'
  })

  return [user, error]
}

export const signInWithGithub = async () => {
  const { user, error } = await supabase.auth.signInWithOAuth({
    provider: 'github'
  })

  return [user, error]
}

export const signOutFromSupabase = () => {
  supabase.auth.signOut()
}
