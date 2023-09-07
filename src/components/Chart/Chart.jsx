import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

export default function Chart() {
  const { incomes, expenses } = useGlobalContext()
  const label = incomes.length < expenses.length ? expenses : incomes

  const data = {
    labels: label.map((l) => {
      const { date } = l
      return dateFormat(date)
    }),
    datasets: [
      {
        label: 'Ingresos',
        data: [
          ...incomes.map((inc) => {
            const { amount } = inc
            return amount
          })
        ],
        backgroundColor: '#66b436',
        tension: 0.2
      },
      {
        label: 'Gastos',
        data: [
          ...expenses.map((exp) => {
            const { amount } = exp
            return amount
          })
        ],
        backgroundColor: '#e20d0d',
        tension: 0.2
      }
    ]
  }

  return (
    <ChartStyled>
      <Line data={data} />
    </ChartStyled>
  )
}

const ChartStyled = styled.div`
  background: transparent;
  border: 2px solid var(--border-color);
  box-shadow: 0px 1px 15px rgba(158, 157, 157, 0.4);
  border-radius: 20px;
  padding: 1rem;
  height: 100%;
`
