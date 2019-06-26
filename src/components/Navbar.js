import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../features/auth'

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

function Navbar({ auth }) {
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <NavbarContainer className="w-full py-4 px-4">
      <nav className="flex mx-auto items-center justify-between">
        <Link className="px-3" to="/">
          Trello Clone
        </Link>
        <NavLinks className="flex">
          {auth.isLoggedIn ? (
            <>
              <li>
                <Link className="px-3" to="/">
                  {auth.user.name}
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
