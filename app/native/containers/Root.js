import React, { Component } from 'react'
import { View } from 'react-native'
import HeaderContainer from './HeaderContainer'
import TimelineContainer from './TimelineContainer'

class Root extends Component {
  static fetchData({ dispatch, params, route }) {
    console.log('fetch data')
    // let categorySlug = route.categorySlug
    // let filter = route.filter

    return [
      // dispatch(CurrentCategoryActions.getCategory(categorySlug)),
      // dispatch(CategoryActions.getCategories())
      // dispatch(PublishersActions.getPublishers()),
      // TimelineContainer.fetchData.apply(this, arguments)
    ]
  }

  render () {
    return (
      <View>
        <HeaderContainer />
        <TimelineContainer />
      </View>
    )
  }
}

export default Root
