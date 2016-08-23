import React, { Component } from 'react'
import { Provider } from 'react-redux'
import App from './App'
import configureStore from '../config/configureStore'

import mock from '../store/mock.json'

const store = configureStore(mock)

export default class Root extends Component {
  static fetchData({ dispatch, params, route }) {
    console.log('fetch data')
    // let categorySlug = route.categorySlug
    // let filter = route.filter

    return [
      // dispatch(CurrentCategoryActions.getCategory(categorySlug)),
      dispatch(CategoryActions.getCategories())
      // dispatch(PublishersActions.getPublishers()),
      // TimelineContainer.fetchData.apply(this, arguments)
    ]
  }

  render () {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
