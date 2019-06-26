import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authActions, requestLogin } from '../features/auth'
import { withRouter } from 'react-router-dom'

function LoginScreen({ history }) {
  const [email, setEmail] = useState('')
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

    dispatch(requestLogin({ email, password, history }))
  }

  return (
    <div className="w-full flex justify-center container mx-auto pt-8 px-3">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl mb-2">Please Log In</h2>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={onSubmit}>
          {auth.errorMessage && (
            <p className="error-message mb-4">{auth.errorMessage}</p>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              type="submit">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default withRouter(LoginScreen)
