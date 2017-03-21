import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import apolloClient from './apolloClient'
import thunkMiddleware from 'redux-thunk'
import * as reducers from '../reducers/index'
import { createNavigationEnabledStore } from '@exponent/ex-navigation'

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation'
})

const createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware),
  applyMiddleware(apolloClient.middleware())
)(createStoreWithNavigation)

const rootReducer = combineReducers(reducers)

export default function configureStore (initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
