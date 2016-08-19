import React, { Component } from 'react'
import { Provider } from 'react-redux'
import App from './App'
import configureStore from '../store/configureStore'

const getInitialState = () => ({
  routing: {},
  CategoriesReducers: {
    categories: [{name: 'Tech'}, {name: 'Science'}, {name: 'Weather'}]
  },
  CurrentCategoryReducers: {},
  FilterReducers: {},
  PublishersReducers: {},
  TimelineReducers: {}
})

const store = configureStore(getInitialState())

export default class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
