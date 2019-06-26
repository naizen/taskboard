import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Navbar from './components/Navbar'
import Board from './components/Board'
import LoginScreen from './components/LoginScreen'
import RegisterScreen from './components/RegisterScreen'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import './App.css'

const MainContainer = styled.div`
  padding-top: 3em;
  height: 100%;
  background-color: #edf2f7;
`

function App() {
  const auth = useSelector(state => state.auth)

  return (
    <Router>
      <Navbar auth={auth} />
      <MainContainer>
        <PrivateRoute
          path="/"
          exact
          component={Board}
          isLoggedIn={auth.isLoggedIn}
        />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
      </MainContainer>
    </Router>
  )
}

function PrivateRoute({ component: Component, isLoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
    />
  )
}

export default App
