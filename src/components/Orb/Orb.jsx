import styled, { keyframes } from 'styled-components'
import { useWindowSize } from '../../utils/useWindowSize'

export default function Orb() {
  const { width, height } = useWindowSize()

  const moveOrb = keyframes`
    0% {
      transform: translate(0, 0);
    }

    50% {
      transform: translate(${width / 1.2}px, ${height / 2}px);
    }

    100% {
      transform: translate(0, 0);
    }
  `

  const OrbStyled = styled.div`
    width: 70vh;
    height: 70vh;
    position: absolute;
    border-radius: 50%;
    margin-left: -35vh;
    margin-top: -35vh;
    background: linear-gradient(180deg, #e66ad1 0%, #3e95dd 100%);
    filter: blur(400px);
    animation: ${moveOrb} 10s alternate linear infinite;
  `

  return <OrbStyled width={width} height={height} />
}
