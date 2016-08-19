import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import * as reducers from '../../reducers/index'

const rootReducer = combineReducers(reducers)
const loggerMiddleware = createLogger()

const createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)(createStore)

export default function configureStore (initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
