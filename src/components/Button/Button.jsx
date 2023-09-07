import styled from 'styled-components'
import PropTypes from 'prop-types'

export default function Button({ name, icon, onClick, bg, bPad, color, bRad }) {
  return (
    <ButtonStyled
      style={{
        background: bg,
        padding: bPad,
        borderRadius: bRad,
        color: color
      }}
      onClick={onClick}
    >
      {icon}
      {name}
    </ButtonStyled>
  )
}

Button.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  bg: PropTypes.string.isRequired,
  bPad: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  bRad: PropTypes.string.isRequired
}

const ButtonStyled = styled.button`
  align-items: center;
  border: none;
  display: flex;
  font-family: inherit;
  font-size: inherit;
  gap: 0.5rem;
  outline: none;
  cursor: pointer;
`
