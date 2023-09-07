import Dashboard from '../Dashboard/Dashboard'
import Expenses from '../Expenses/Expenses'
import Incomes from '../Incomes/Incomes'
import Navigation from '../Navigation/Navigation'
import { useState } from 'react'

export default function MainPage({ session }) {
  const [active, setActive] = useState(1)

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />
      case 2:
        return <Dashboard />
      case 3:
        return <Incomes />
      case 4:
        return <Expenses />
      default:
        return <Dashboard />
    }
  }

  return (
    <>
      <Navigation active={active} setActive={setActive} session={session} />
      <main>{displayData()}</main>
    </>
  )
}
