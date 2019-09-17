import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import { combineReducers } from 'redux'
import logger from 'redux-logger'
import { auth, board } from './features'

const preloadedState = {}

const reducer = combineReducers({
  auth: auth.reducer,
  board: board.reducer
})

const middleware = [...getDefaultMiddleware(), logger]

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState
})

export default store
