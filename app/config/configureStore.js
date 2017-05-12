import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import apolloClient from './apolloClient'
import thunkMiddleware from 'redux-thunk'
import * as reducers from '../reducers/index'
import { createNavigationEnabledStore } from '@exponent/ex-navigation'
import Router from '../config/Router'

const initialState = Router.router.getStateForAction(Router.router.getActionForPathAndParams('timeline'))

const navReducer = (state = initialState, action) => {
  const nextState = Router.router.getStateForAction(action, state)

  console.log(state)

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state
}

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation'
})

const createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware),
  applyMiddleware(apolloClient.middleware())
)(createStoreWithNavigation)

const rootReducer = combineReducers({
  nav: navReducer,
  ...reducers
})

export default function configureStore (initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
