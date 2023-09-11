import styled from 'styled-components'
import PropTypes from 'prop-types'

import avatar from '../../img/logo.png'
import { menuItems } from '../../utils/menuItmes'
import { signout, login } from '../../utils/Icons'
import { signOutFromSupabase } from '../../services'
import { useGlobalContext } from '../../context/globalContext'

export default function Navigation({ active, setActive, session }) {
  const { user, setError } = useGlobalContext()

  const avatarURL = user ? user[0]?.avatar_url : null
  const username = user ? user[0]?.user_name : 'Username'

  return (
    <NavStyled>
      <div className="user-con">
        <img src={avatarURL ? avatarURL : avatar} alt="avatar" />
        <div className="text">
          <h2>{username}</h2>
          <p>Tu Dinero</p>
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => {
                if (session !== null && session?.session !== null)
                  setActive(item.id)
              }}
              className={active === item.id ? 'active' : ''}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          )
        })}
      </ul>
      <div className="bottom-nav">
        {session === null || session?.session === null ? (
          <li
            onClick={() => {
              setError(null)
              setActive(0)
            }}
            className={active === 0 ? 'active' : ''}
          >
            {login} Iniciar Sesión
          </li>
        ) : (
          <li
            onClick={() => signOutFromSupabase()}
            className={active === 0 ? 'active' : ''}
          >
            {signout} Cerrar Sesión
          </li>
        )}
      </div>
    </NavStyled>
  )
}

Navigation.propTypes = {
  active: PropTypes.number.isRequired,
  setActive: PropTypes.func.isRequired,
  session: PropTypes.object
}

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }

    h2 {
      color: rgba(34, 34, 96, 1);
    }

    p {
      color: rgba(34, 34, 96, 0.6);
    }
  }

  .menu-items {
    flex: 1;
    display: block;
    flex-direction: column;

    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;

      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;

    i {
      color: rgba(34, 34, 96, 1) !important;
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }

  .bottom-nav {
    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;

      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }
    }

    .ti-login {
      font-size: 1.6rem;
    }
  }
`
