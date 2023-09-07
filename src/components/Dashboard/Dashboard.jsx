import styled from 'styled-components'
import { useEffect } from 'react'

import { InnerLayout } from '../../styles/Layout'
import Chart from '../Chart/Chart'
import { dollar } from '../../utils/Icons'
import { useGlobalContext } from '../../context/globalContext'
import History from '../History/History'

export default function Dashboard() {
  const {
    incomes,
    expenses,
    totalExpense,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses
  } = useGlobalContext()

  useEffect(() => {
    getIncomes()
    getExpenses()
  }, [])

  const colorbalance =
    totalBalance() > 0 ? 'var(--color-green)' : 'var(--color-delete)'

  return (
    <DashboardStyled colorbalance={colorbalance}>
      <InnerLayout>
        <h1>Todas las Transacciones</h1>
        <div className="stats-con">
          <div className="chart-con">
            <Chart />
            <div className="amount-con">
              <div className="income">
                <h2>Ingresos Totales</h2>
                <p>
                  {dollar} {totalIncome()}
                </p>
              </div>
              <div className="expense">
                <h2>Gastos Totales</h2>
                <p>
                  {dollar} {totalExpense()}
                </p>
              </div>
              <div className="balance">
                <h2>Balance Total</h2>
                <p style={{}}>
                  {dollar} {totalBalance()}
                </p>
              </div>
            </div>
          </div>
          <div className="history-con">
            <History />
            <h2 className="salary-title">
              Min <span>Ingresos</span> Max
            </h2>
            <div className="salary-item">
              <p>
                {incomes.length > 0
                  ? Math.min(...incomes.map((item) => item.amount))
                  : '-'}
              </p>
              <p>
                {incomes.length > 0
                  ? Math.max(...incomes.map((item) => item.amount))
                  : '-'}
              </p>
            </div>
            <h2 className="salary-title">
              Min <span>Gastos</span> Max
            </h2>
            <div className="salary-item">
              <p>
                {expenses.length > 0
                  ? Math.min(...expenses.map((item) => item.amount))
                  : '-'}
              </p>
              <p>
                {expenses.length > 0
                  ? Math.max(...expenses.map((item) => item.amount))
                  : '-'}
              </p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  )
}

const DashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;

    .chart-con {
      grid-column: 1/4;
      height: 400px;

      .amount-con {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;

        .income,
        .expense {
          grid-column: span 2;
        }

        .income,
        .expense,
        .balance {
          background: transparent;
          border: 2px solid var(--border-color);
          box-shadow: 0px 1px 15px rgba(158, 157, 157, 0.4);
          border-radius: 20px;
          padding: 1rem;

          p {
            font-size: 3.5rem;
            font-weight: 700;
          }
        }

        .balance {
          grid-column: 2/4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          p {
            color: ${(props) => props.colorbalance};
            opacity: 0.6;
            font-size: 4.5rem;
          }
        }
      }
    }

    .history-con {
      grid-column: 4/-1;

      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .salary-title {
        font-size: 1.2rem;

        span {
          font-size: 1.8rem;
        }
      }

      .salary-item {
        background: transparent;
        border: 2px solid var(--border-color);
        box-shadow: 0px 1px 15px rgba(158, 157, 157, 0.4);
        border-radius: 20px;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
          font-size: 1.6rem;
          font-weight: 600;
        }
      }
    }
  }
`
