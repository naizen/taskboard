import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../features/auth'
import { ReactComponent as BoardIconSvg } from '../icons/dashboard.svg'

const NavLinks = styled.ul`
  list-style: none;
  li {
    display: inline-block;
  }
`

const NavbarContainer = styled.div`
  background-color: #3381e6;
  color: white;
  position: absolute;
`

const BoardIcon = styled(BoardIconSvg)`
  display: inline-block;
  fill: rgba(255, 255, 255, 0.6);
  vertical-align: top;
`

function Navbar({ auth }) {
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <NavbarContainer className="w-full py-4 px-4">
      <nav className="flex mx-auto items-center justify-between">
        <Link className="px-3" to="/">
          <BoardIcon /> TaskBoard
        </Link>
        <NavLinks className="flex">
          {auth.isLoggedIn ? (
            <>
              <li>
                <Link className="px-3" to="/">
                  {auth.user.username}
                </Link>
                <button className="px-3" onClick={handleLogOut}>
                  Log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="px-3" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="px-3" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </NavLinks>
      </nav>
    </NavbarContainer>
  )
}

export default Navbar
