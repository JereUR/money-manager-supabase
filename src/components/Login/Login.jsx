import styled from 'styled-components'
import { githubIcon, googleIcon } from '../../utils/Icons'

export default function Login() {
  return (
    <LoginStyled>
      <h1>Inicia Sesión</h1>
      <div className="button-section">
        <ButtonStyledGoogle>
          {googleIcon}
          Iniciar Sesión con Google
        </ButtonStyledGoogle>
        <ButtonStyledGithub>
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
  margin-bottom: 3vw;
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
`

const ButtonStyledGithub = styled(ButtonStyledGoogle)`
  color: #ffffff;
  background-color: rgb(24, 23, 23);
`

const LoginStyled = styled.div`
  h1 {
    text-align: center;
    margin-top: 5vw;
  }

  .button-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 65vh;
  }
`
