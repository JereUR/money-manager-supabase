import styled, { keyframes } from 'styled-components'

export const Loader = () => {
  return (
    <LoaderStyled>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </LoaderStyled>
  )
}

const ldsRing = keyframes`
  0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`

const LoaderStyled = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  left: 45%;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 40px;
    height: 40px;
    border: 8px solid var(--primary-color);
    border-radius: 50%;
    animation: ${ldsRing} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: var(--primary-color) transparent transparent transparent;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }
`
