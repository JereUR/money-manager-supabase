import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'

import { githubIcon /* , googleIcon */ } from '../../utils/Icons'
import {
  signInWithEmail,
  signInWithGithub /* , signInWithGoogle */
} from '../../services'
import { useState } from 'react'
import Button from '../Button/Button'
import { useGlobalContext } from '../../context/globalContext'
import { Loader } from '../Loader/Loader'

export default function Login({ setActive }) {
  const { error, setError } = useGlobalContext()
  const [loading, setLoading] = useState(false)

  const initialData = {
    email: '',
    password: ''
  }

  const [inputState, setInputState] = useState(initialData)
  const [errorForm, setErrorForm] = useState({})

  const { email, password } = inputState

  const validation = () => {
    let err = {}

    if (inputState.email === '') {
      err.email = 'Ingrese un email.'
    }

    if (inputState.password === '') {
      err.password = 'Ingrese una contraseña.'
    }

    return err
  }

  const handleInput =
    (name) =>
    ({ target }) => {
      setInputState({ ...inputState, [name]: target.value })
    }

  const handleEmail = async (e) => {
    e.preventDefault()

    const err = validation()
    setErrorForm(err)

    if (Object.keys(err).length === 0) {
      setLoading(true)
      const { error } = await signInWithEmail({
        email: inputState.email,
        password: inputState.password
      })

      if (error !== null && error !== undefined) {
        if (error.message.includes('Invalid login credentials')) {
          setError('Credenciales incorrectas.')
          setLoading(false)
          return
        }
      }

      setInputState(initialData)
    }

    setLoading(false)
  }

  const handleGithub = async () => {
    await signInWithGithub()
  }

  return (
    <LoginStyled>
      <h2>Iniciar Sesión</h2>
      <div className="login-section">
        <p className="login-email">Con tu email y contraseña:</p>
        <LoginFormStyled onSubmit={handleEmail}>
          {error && <p className="error">{error}</p>}
          <div className="input-control">
            <input
              type="email"
              value={email}
              name="email"
              placeholder="Ingrese su email"
              onChange={handleInput('email')}
            />
            {errorForm.email && <span>{errorForm.email}</span>}
          </div>
          <div className="input-control">
            <input
              type="password"
              value={password}
              name="password"
              placeholder="Ingrese su contraseña"
              onChange={handleInput('password')}
            />
            {errorForm.password && <span>{errorForm.password}</span>}
          </div>
          <div className="submit-btn">
            <Button
              name={'Iniciar Sesión'}
              bPad={'.8rem 1.6rem'}
              bRad={'30px'}
              bg={'var(--primary-button)'}
              color={'#fff'}
            />
          </div>
          {loading && <Loader />}
        </LoginFormStyled>
        <div className="separator">
          <hr className="continuous-line" />
          <span>o</span>
          <hr className="continuous-line" />
        </div>
        <div className="button-section">
          {/* <ButtonStyledGoogle onClick={handleGoogle}>
            {googleIcon}
            Iniciar Sesión con Google
          </ButtonStyledGoogle> */}
          <ButtonStyledGithub onClick={handleGithub}>
            {githubIcon}
            Iniciar Sesión con Github
          </ButtonStyledGithub>
        </div>
        <h5>
          No tienes cuenta? Regístrate{' '}
          <span
            className="redirect"
            onClick={() => {
              setError(null)
              setActive(4)
            }}
          >
            aquí
          </span>
        </h5>
      </div>
    </LoginStyled>
  )
}

Login.propTypes = {
  setActive: PropTypes.func
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

const ButtonStyledGoogle = styled.button`
  width: 320px;
  display: flex;
  justify-content: center;
  padding: 0.5rem 1.4rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  vertical-align: middle;
  align-items: center;
  border-radius: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.25);
  gap: 0.75rem;
  color: rgb(65, 63, 63);
  background-color: #fff;
  cursor: pointer;
  transition: all 0.6s ease;

  svg {
    height: 24px;
  }

  &:hover {
    transform: scale(1.02);
  }

  &:first-child {
    margin-bottom: 2vw;
  }
`

const ButtonStyledGithub = styled(ButtonStyledGoogle)`
  color: #ffffff;
  background-color: rgb(24, 23, 23);
`

const LoginStyled = styled.div`
  .login-section {
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

    .login-email {
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

const LoginFormStyled = styled.form`
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
