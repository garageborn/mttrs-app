import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import CategoryHeaderContainer from './CategoryHeaderContainer'
import TimelineContainer from './TimelineContainer'
import styles from '../styles/App'
import * as CurrentCategoryActions from '../../actions/CurrentCategoryActions'
import * as CurrentPublisherActions from '../../actions/CurrentPublisherActions'

class CategorySceneContainer extends Component {
  static fetchData({ dispatch, categorySlug }) {
    return [
      dispatch(CurrentPublisherActions.clear()),
      dispatch(CurrentCategoryActions.getCategory(categorySlug))
    ]
  }

  componentDidMount() {
    this.constructor.fetchData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categorySlug !== this.props.categorySlug) {
      this.constructor.fetchData(nextProps)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <CategoryHeaderContainer />
        <TimelineContainer />
      </View>
    )
  }
}

let mapStateToProps = (state, ownProps) => {
  return {
    categorySlug: ownProps.categorySlug
  }
}
export default connect(mapStateToProps)(CategorySceneContainer)
