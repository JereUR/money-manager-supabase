import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import esLocale from 'date-fns/locale/es'

import { useGlobalContext } from '../../context/globalContext'
import Button from '../Button/Button'
import { plus } from '../../utils/Icons'

const initialData = {
  title: '',
  amount: '',
  date: '',
  category: '',
  description: ''
}

export default function ExpenseForm() {
  const { addExpense, getExpenses, error, setError } = useGlobalContext()
  const [inputState, setInputState] = useState(initialData)
  const [errorForm, setErrorForm] = useState({})

  const { title, amount, date, category, description } = inputState

  const validation = () => {
    let err = {}

    if (inputState.title.length > 50) {
      err.title = 'El título no puede tener más de 50 caracteres.'
    }

    if (inputState.title === '') {
      err.title = 'Ingrese un título.'
    }

    if (inputState.amount.length > 20) {
      err.amount = 'El gasto no puede tener más de 20 caracteres.'
    }

    if (inputState.amount === '') {
      err.amount = 'Ingrese un gasto.'
    }

    if (inputState.date === '') {
      err.date = 'Ingrese una fecha.'
    }

    if (inputState.category === '') {
      err.category = 'Seleccione una categoría.'
    }

    if (inputState.description.length > 30) {
      err.description = 'La descripción no puede tener más de 30 caracteres.'
    }

    if (inputState.description === '') {
      err.description = 'Ingrese una descripción.'
    }

    return err
  }

  const handleInput =
    (name) =>
    ({ target }) => {
      setInputState({ ...inputState, [name]: target.value })
    }

  const handleSubmit = (e) => {
    e.preventDefault()

    const err = validation()
    setErrorForm(err)

    if (Object.keys(err).length === 0) {
      addExpense(inputState)
      setInputState(initialData)
      getExpenses()
      setErrorForm({})
      setError('')
    }
  }

  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="input-control">
        <input
          type="text"
          value={title}
          name="title"
          placeholder="Nombre del Gasto"
          onChange={handleInput('title')}
        />
        {errorForm.title && <span>{errorForm.title}</span>}
      </div>
      <div className="input-control">
        <input
          type="number"
          value={amount}
          name="amount"
          placeholder="Total del Gasto"
          onChange={handleInput('amount')}
        />
        {errorForm.amount && <span>{errorForm.amount}</span>}
      </div>
      <div className="input-control">
        <DatePicker
          id="date"
          placeholderText="Fecha"
          selected={date}
          locale={esLocale}
          dateExpenseFormat="dd/MM/yyyy"
          onChange={(date) => {
            setInputState({ ...inputState, date: date })
          }}
        />
        {errorForm.date && <span>{errorForm.date}</span>}
      </div>
      <div className="selects input-control">
        <select
          name="category"
          id="category"
          value={category}
          onChange={handleInput('category')}
        >
          <option value="" disabled>
            Seleccione una Opción
          </option>
          <option value="education">Educación</option>
          <option value="groceries">Comestibles</option>
          <option value="health">Salud</option>
          <option value="subscriptions">Suscripciones</option>
          <option value="takeaways">Delivery</option>
          <option value="clothing">Vestimentas</option>
          <option value="travelling">Viajes</option>
          <option value="other">Otros</option>
        </select>
        {errorForm.category && <span>{errorForm.category}</span>}
      </div>
      <div className="input-control">
        <textarea
          name="description"
          value={description}
          placeholder="Referencia/Descripción"
          id="description"
          cols="30"
          rows="4"
          onChange={handleInput('description')}
        ></textarea>
        {errorForm.description && <span>{errorForm.description}</span>}
      </div>
      <div className="submit-btn">
        <Button
          name={'Agregar Gasto'}
          icon={plus}
          bPad={'.8rem 1.6rem'}
          bRad={'30px'}
          bg={'var(--color-accent)'}
          color={'#fff'}
        />
      </div>
    </ExpenseFormStyled>
  )
}

const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  20%, 60%{
    transform: translateX(-5px);
  }
  40%, 80% {
    transform: translateX(5px);
  }
  `

const ExpenseFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;

  .error {
    font-size: 14px;
    margin-left: 1rem;
    color: var(--color-delete);
    animation: ${shake} 0.6s;
  }

  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid var(--border-color);
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(158, 157, 157, 0.4);
    color: rgba(34, 34, 96, 0.9);

    &::placeholder {
      color: rgba(34, 34, 96, 0.7);
    }
  }

  .input-control {
    display: flex;
    flex-direction: column;

    input {
      width: 100%;
    }

    span {
      font-size: 14px;
      margin-left: 1rem;
      color: var(--color-delete);
      animation: ${shake} 0.6s;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;

    select {
      color: rgba(34, 34, 96, 0.7);

      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      transition: all 0.3s ease-in-out;

      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`
