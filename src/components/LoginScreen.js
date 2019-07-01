import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authActions, requestLogin } from '../features/auth'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { ReactComponent as LoadingSvg } from '../assets/oval.svg'

const LoadingIcon = styled(LoadingSvg)`
  width: 24px;
  margin-left: 15px;
  display: inline-block;
`

function LoginScreen({ history }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    return () => {
      dispatch(authActions.setErrorMessage(''))
    }
  }, [])

  const onSubmit = event => {
    event.preventDefault()

    dispatch(requestLogin({ username, password, history }))
  }

  return (
    <div className="w-full flex justify-center container mx-auto pt-8 px-3">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl mb-2">Please Log In</h2>
        <form
          className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4"
          onSubmit={onSubmit}>
          {auth.errorMessage && (
            <div className="error-message mb-2">{auth.errorMessage}</div>
          )}
          <div class="text-gray-500 mb-3">
            Demo Account: <br />
            Username: Demo <br />
            Password: demo
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="**************"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full text-lg bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              type="submit"
              disabled={auth.isLoading ? true : false}>
              {auth.isLoading ? (
                <span>
                  Logging you in... <LoadingIcon />
                </span>
              ) : (
                <span>Log In</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default withRouter(LoginScreen)
