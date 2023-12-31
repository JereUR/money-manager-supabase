import styled from 'styled-components'
import PropTypes from 'prop-types'

import { InnerLayout } from '../../styles/Layout'
import { useGlobalContext } from '../../context/globalContext'
import { useEffect } from 'react'
import Item from '../Item/Item'
import IncomeForm from '../Form/IncomeForm'
import Login from '../Login/Login'

export default function Incomes({ session }) {
  const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext()

  useEffect(() => {
    if (session !== null) getIncomes()
  }, [session])

  if (session !== null) {
    return (
      <IncomesStyled>
        <InnerLayout>
          <h1>Ingresos</h1>
          <h2 className="total-income">
            Ingresos Totales: <span>${totalIncome()}</span>
          </h2>
          <div className="income-content">
            <div className="form-container">
              <IncomeForm />
            </div>
            <div className="incomes">
              {incomes.length > 0 &&
                incomes.map((income) => {
                  const { id, title, amount, date, category, description } =
                    income

                  return (
                    <Item
                      key={id}
                      id={id}
                      title={title}
                      amount={amount}
                      date={date}
                      category={category}
                      description={description}
                      indicatorColor="var(--color-green)"
                      deleteItem={deleteIncome}
                    />
                  )
                })}
            </div>
          </div>
        </InnerLayout>
      </IncomesStyled>
    )
  } else {
    return <Login />
  }
}

Incomes.propTypes = {
  session: PropTypes.object
}

const IncomesStyled = styled.div`
  display: flex;
  overflow: auto;

  .total-income {
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
      color: var(--color-green);
    }
  }

  .income-content {
    display: flex;
    gap: 2rem;

    .incomes {
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
