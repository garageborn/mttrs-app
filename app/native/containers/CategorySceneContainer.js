import React, { Component } from 'react'
import { View } from 'react-native'
import {connect} from 'react-redux'
import CategoryHeaderContainer from './CategoryHeaderContainer'
import TimelineContainer from './TimelineContainer'
import styles from '../styles/App'
import * as CurrentCategoryActions from '../../actions/CurrentCategoryActions'

class CategorySceneContainer extends Component {
  componentDidMount() {
    console.log('did mount')
    let action = CurrentCategoryActions.getCategory(this.props.categorySlug)
    this.props.dispatch(action)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categorySlug !== this.props.categorySlug) {
      let action = CurrentCategoryActions.getCategory(nextProps.categorySlug)
      this.props.dispatch(action)
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
