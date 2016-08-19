import React, { Component } from 'react'
import { Provider } from 'react-redux'
import App from './App'
import configureStore from '../store/configureStore'

import mock from '../store/mock.json'

const store = configureStore(mock)

export default class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
