import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'

export default function History() {
  const { transactionHistory } = useGlobalContext()

  const [...history] = transactionHistory()

  return (
    <HistoryStyled>
      <h2>Historial Reciente</h2>
      {history.map((item) => {
        const { _id, title, amount, type } = item

        return (
          <div key={_id} className="history-item">
            <p style={{ color: type === 'expense' ? '#e20d0d' : '#66b436' }}>
              {title}
            </p>
            <p style={{ color: type === 'expense' ? '#e20d0d' : '#66b436' }}>
              {type === 'expense' ? `-${amount}` : `+${amount}`}
            </p>
          </div>
        )
      })}
    </HistoryStyled>
  )
}

const HistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 5vh;

  .history-item {
    background: transparent;
    border: 2px solid var(--border-color);
    box-shadow: 0px 1px 15px rgba(158, 157, 157, 0.4);
    border-radius: 20px;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
