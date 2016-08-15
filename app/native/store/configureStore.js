import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import * as reducers from '../../reducers/index'
const loggerMiddleware = createLogger()
const rootReducer = combineReducers(reducers)

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
    applyMiddleware(loggerMiddleware)
  )(initialState)
}
