import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import * as reducers from '../../reducers/index'

const routeMiddleware = routerMiddleware(browserHistory)
const loggerMiddleware = createLogger()

const createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware),
  applyMiddleware(routeMiddleware),
  applyMiddleware(loggerMiddleware)
)(createStore)

const rootReducer = combineReducers(reducers)

export default function configureStore (initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
