import styled from 'styled-components'
import { useMemo, useState } from 'react'

import bg from './img/bg.jpg'
import { MainLayout } from './styles/Layout'
import Orb from './components/Orb/Orb'
import Navigation from './components/Navigation/Navigation'
import Dashboard from './components/Dashboard/Dashboard'
import Incomes from './components/Incomes/Incomes'
import Expenses from './components/Expenses/Expenses'
import Login from './components/Login/Login'
import { useGlobalContext } from './context/globalContext'
import useUpdateSession from './utils/useUpdateSession'

function App() {
  const [active, setActive] = useState(1)
  const { session } = useGlobalContext()
  useUpdateSession({ session, setActive })

  const displayData = () => {
    switch (active) {
      case 0:
        return <Login />
      case 1:
        return <Dashboard session={session} />
      case 2:
        return <Incomes session={session} />
      case 3:
        return <Expenses session={session} />
      default:
        return <Dashboard session={session} />
    }
  }

  const orbMemo = useMemo(() => {
    return <Orb />
  }, [])

  return (
    <AppStyled>
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} session={session} />
        <main>{displayData()}</main>
      </MainLayout>
    </AppStyled>
  )
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
`

export default App
