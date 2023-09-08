import styled from 'styled-components'
import { githubIcon, googleIcon } from '../../utils/Icons'
import { signInWithGithub, signInWithGoogle } from '../../services'

export default function Login() {
  const handleGoogle = async () => {
    const response = await signInWithGoogle()

    console.log({ response })
  }

  const handleGithub = async () => {
    const response = await signInWithGithub()

    console.log({ response })
  }

  return (
    <LoginStyled>
      <h1>Inicia Sesión</h1>
      <div className="button-section">
        <ButtonStyledGoogle onClick={handleGoogle}>
          {googleIcon}
          Iniciar Sesión con Google
        </ButtonStyledGoogle>
        <ButtonStyledGithub onClick={handleGithub}>
          {githubIcon}
          Iniciar Sesión con Github
        </ButtonStyledGithub>
      </div>
    </LoginStyled>
  )
}

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
    margin-bottom: 3vw;
  }
`

const ButtonStyledGithub = styled(ButtonStyledGoogle)`
  color: #ffffff;
  background-color: rgb(24, 23, 23);
`

const LoginStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--border-color);
  box-shadow: 0px 1px 15px rgba(158, 157, 157, 0.4);
  border-radius: 20px;
  margin: 10vh;
  padding-bottom: 10vh;
  height: 70vh;

  @media screen and (max-width: 960px) {
    margin: 10vh 20px;
  }

  h1 {
    text-align: center;
    margin-top: 5vw;
  }

  .button-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10vh;
  }
`
