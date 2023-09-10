import { supabase } from './supabase'

//User Data

export const getUserFromSupabase = async () => {
  return await supabase.auth.getUser()
}

//Incomes

export const getIncomesFromSupabase = async () => {
  const user = await getUserFromSupabase()

  if (user === null) return

  const { data: incomes, error } = await supabase
    .from('incomes')
    .select('*')
    .eq('user_id', user.data.user.id)
    .order('date', { ascending: false })

  return [error, incomes]
}

export const addIncomeToSupabase = async (data) => {
  const { data: incomes, error } = await supabase
    .from('incomes')
    .insert(data)
    .select()

  return [error, incomes]
}

export const deleteIncomeFromSupabase = async (id) => {
  try {
    const { data, error } = await supabase.from('incomes').delete().eq('id', id)

    return [data, error]
  } catch (error) {
    console.error('Error al eliminar la fila:', error.message)
  }
}

//Expenses

export const getExpensesFromSupabase = async () => {
  const user = await getUserFromSupabase()

  if (user === null) throw new Error({ message: 'Sesión no iniciada.' })

  const { data: expenses, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', user.data.user.id)
    .order('date', { ascending: false })

  return [error, expenses]
}

export const addExpenseToSupabase = async (data) => {
  const { data: expenses, error } = await supabase
    .from('expenses')
    .insert(data)
    .select()

  return [error, expenses]
}

export const deleteExpenseFromSupabase = async (id) => {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)

    return [data, error]
  } catch (error) {
    console.error('Error al eliminar la fila:', error.message)
  }
}

//Session

export const updateUser = async (credentials, user) => {
  console.log({ user })
  const { error: errorUpdate } = await supabase
    .from('users')
    .update({ name: credentials.name, user_name: credentials.user_name })
    .eq('id', user.user.id)
    .select()

  console.log({ errorUpdate })

  return [errorUpdate]
}

export const signUpWithEmail = async (credentials) => {
  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password
  })

  if (error === null) {
    const { errorUpdate } = await updateUser(credentials, data)

    return [data, error, errorUpdate]
  }

  console.log({ error, data })

  return [data, error]
}

export const signInWithEmail = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })

  return [data, error]
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
