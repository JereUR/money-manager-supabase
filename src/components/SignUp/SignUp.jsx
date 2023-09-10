import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { signUpWithEmail } from '../../services'
import { useState } from 'react'
import Button from '../Button/Button'
import { useGlobalContext } from '../../context/globalContext'
import { Loader } from '../Loader/Loader'

export default function SignUp({ setActive }) {
  const { error, setError } = useGlobalContext()
  const [loading, setLoading] = useState(false)

  const initialData = {
    name: '',
    user_name: '',
    email: '',
    password: '',
    confirm_password: ''
  }

  const [inputState, setInputState] = useState(initialData)
  const [errorForm, setErrorForm] = useState({})

  const { name, user_name, email, password, confirm_password } = inputState

  const validation = () => {
    let err = {}

    if (inputState.name === '') {
      err.name = 'Debe ingresar su nombre.'
    }

    if (inputState.name.length > 25) {
      err.name = 'El nombre no debe exceder los 25 caracteres.'
    }

    if (inputState.user_name === '') {
      err.user_name = 'Debe ingresar su nombre de usuario.'
    }

    if (inputState.user_name.length > 15) {
      err.user_name = 'El nombre de usuario no debe exceder los 15 caracteres.'
    }

    if (inputState.email === '') {
      err.email = 'Debe ingresar un email.'
    }

    if (inputState.password === '') {
      err.password = 'Debe ingresar una contraseña.'
    }

    if (inputState.password.length < 8) {
      err.password = 'La contraseña debe tener un mínimo de 8 caracteres.'
    }

    if (inputState.confirm_password === '') {
      err.confirm_password = 'Debe confirmar su contraseña.'
    }

    if (inputState.confirm_password !== inputState.password) {
      err.password = 'Las contraseñas no coinciden.'
      err.confirm_password = 'Las contraseñas no coinciden.'
    }

    return err
  }

  const handleInput =
    (name) =>
    ({ target }) => {
      setInputState({ ...inputState, [name]: target.value })
    }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)

    const err = validation()
    setErrorForm(err)

    if (Object.keys(err).length === 0) {
      const { error: errorSignUp, errorUpdate } = await signUpWithEmail(
        inputState
      )

      if (errorSignUp !== null && errorSignUp !== undefined) {
        setError(errorSignUp)
        return
      }

      if (errorUpdate !== null && errorUpdate !== undefined) {
        setError(errorUpdate)
        return
      }

      setInputState(initialData)

      toast.success(
        'Registro exitoso. Chequea tu email y confirma tu cuenta para poder iniciar sesión. Redirigiendo...',
        {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark'
        }
      )

      setTimeout(() => {
        setActive(0)
        setLoading(false)
      }, 4000)
    }
  }

  return (
    <SignUpStyled>
      <h2>Registro</h2>
      <div className="signup-section">
        <SignUpFormStyled onSubmit={handleSignUp}>
          {error && <p className="error">{error}</p>}
          <div className="input-control">
            <input
              type="text"
              value={name}
              name="name"
              placeholder="Nombre"
              onChange={handleInput('name')}
            />
            {errorForm.name && <span>{errorForm.name}</span>}
          </div>
          <div className="input-control">
            <input
              type="text"
              value={user_name}
              name="user_name"
              placeholder="Nombre de usuario"
              onChange={handleInput('user_name')}
            />
            {errorForm.user_name && <span>{errorForm.user_name}</span>}
          </div>
          <div className="input-control">
            <input
              type="email"
              value={email}
              name="email"
              placeholder="Email"
              onChange={handleInput('email')}
            />
            {errorForm.email && <span>{errorForm.email}</span>}
          </div>
          <div className="input-control">
            <input
              type="password"
              value={password}
              name="password"
              placeholder="Contraseña"
              onChange={handleInput('password')}
            />
            {errorForm.password && <span>{errorForm.password}</span>}
          </div>
          <div className="input-control">
            <input
              type="password"
              value={confirm_password}
              name="confirm_password"
              placeholder="Confirme su contraseña"
              onChange={handleInput('confirm_password')}
            />
            {errorForm.confirm_password && (
              <span>{errorForm.confirm_password}</span>
            )}
          </div>
          <div className="submit-btn">
            <Button
              name={'Registrarse'}
              bPad={'.8rem 1.6rem'}
              bRad={'30px'}
              bg={'var(--primary-button)'}
              color={'#fff'}
            />
          </div>
          {loading && <Loader />}
        </SignUpFormStyled>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </SignUpStyled>
  )
}

SignUp.propTypes = {
  setActive: PropTypes.func.isRequired
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

const SignUpStyled = styled.div`
  .signup-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid var(--border-color);
    box-shadow: 0px 1px 15px rgba(158, 157, 157, 0.4);
    border-radius: 20px;
    margin: 5vh;
    height: 70vh;

    .redirect {
      color: var(--color-accent);
      text-decoration: underline;
      cursor: pointer;
    }

    .SignUp-email {
      font-size: 16px;
    }

    .separator {
      display: flex;
      align-items: center;
      text-align: center;
      margin: 10px 0;
    }

    .continuous-line {
      flex-grow: 1;
      border: none;
      height: 1.5px;
      width: 10vw;
      background-color: black;
      margin: 0 10px;
    }
  }

  @media screen and (max-width: 960px) {
    margin: 10vh 20px;
  }

  h2 {
    text-align: center;
    margin-top: 2vw;
  }

  .button-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2vh;
  }
`

const SignUpFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  font-size: 16px;

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
    text-align: center;
    padding: 0.5rem 5rem;
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

  .submit-btn {
    display: flex;
    justify-content: center;
    margin: 10px 0;

    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      transition: all 0.3s ease-in-out;

      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`
