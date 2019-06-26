import { createSlice } from 'redux-starter-kit'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { boardActions } from './board'

const auth = createSlice({
  slice: 'auth',
  initialState: {
    isLoading: false,
    isLoggedIn: !!localStorage.jwtToken,
    user: getDecodedUser(),
    errorMessage: ''
  },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = !!action.payload
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = !!action.payload
    },
    setCurrentUser(state, action) {
      state.user = action.payload
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload
    }
  }
})

export { auth }

export const authActions = auth.actions

export function requestLogin({ email, password, history }) {
  return dispatch => {
    dispatch(auth.actions.setIsLoading(true))
    dispatch(auth.actions.setErrorMessage(''))
    return axios
      .post('/api/login', { email, password })
      .then(response => {
        const user = response.data.user
        const token = response.data.token
        setAuthToken(token)
        dispatch(auth.actions.setCurrentUser(user))
        dispatch(auth.actions.setIsLoggedIn(true))
        history.push('/')
      })
      .catch(error =>
        dispatch(auth.actions.setErrorMessage('Invalid Credentials'))
      )
      .then(() => dispatch(auth.actions.setIsLoading(false)))
  }
}

export function requestRegister({ name, email, password, history }) {
  return dispatch => {
    dispatch(auth.actions.setIsLoading(true))
    dispatch(auth.actions.setErrorMessage(''))
    return axios
      .post('/api/register', { name, email, password })
      .then(response => {
        const user = response.data.user
        const token = response.data.token
        setAuthToken(token)
        dispatch(auth.actions.setCurrentUser(user))
        dispatch(auth.actions.setIsLoggedIn(true))
        history.push('/')
      })
      .catch(error => {
        console.log(error)
        if (error.response) {
          const errorData = error.response.data
          //console.log('errorData: ', errorData)
          let errorMessage = errorData.message
          if (errorData.code === 11000) {
            errorMessage = errorData.errmsg
          }
          dispatch(auth.actions.setErrorMessage(errorMessage))
        }
      })
      .then(() => dispatch(auth.actions.setIsLoading(false)))
  }
}

export function logOut() {
  return dispatch => {
    setAuthToken('')
    dispatch(auth.actions.setIsLoggedIn(false))
    dispatch(auth.actions.setCurrentUser({}))
    dispatch(boardActions.clearBoard())
  }
}

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('jwtToken', token)
    axios.defaults.headers.common['Authorization'] = token
  } else {
    localStorage.setItem('jwtToken', '')
    delete axios.defaults.headers.common['Authorization']
  }
}

function getDecodedUser() {
  if (localStorage.jwtToken) {
    const decoded = jwt_decode(localStorage.jwtToken)
    return decoded
  } else {
    return ''
  }
}
