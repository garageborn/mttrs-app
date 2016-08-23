import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import HeaderContainer from './HeaderContainer'
import TimelineContainer from './TimelineContainer'
import * as CategoryActions from '../../actions/CategoryActions'
import * as PublishersActions from '../../actions/PublishersActions'

class Root extends Component {
  static fetchData({ dispatch, params, route }) {
    // let categorySlug = route.categorySlug

    return [
      // dispatch(CurrentCategoryActions.getCategory(categorySlug)),
      dispatch(CategoryActions.getCategories()),
      dispatch(PublishersActions.getPublishers()),
      TimelineContainer.fetchData.apply(this, arguments)
    ]
  }

  componentDidMount() {
    this.constructor.fetchData(this.props)
  }

  componentWillReceiveProps(nextProps) {
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

let mapStateToProps = (state, ownProps) => {
  return {
    categorySlug: ownProps.categorySlug,
  }
}
export default connect(mapStateToProps)(Root)
