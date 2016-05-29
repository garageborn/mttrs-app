import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {browserHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'
import * as reducers from 'mttrs/app/reducers/index'

let createStoreWithMiddleware
const routeMiddleware = routerMiddleware(browserHistory)

createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware),
  applyMiddleware(routeMiddleware)
)(createStore)

const rootReducer = combineReducers(reducers)

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
