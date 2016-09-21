import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import PublisherHeaderContainer from './PublisherHeaderContainer'
import TimelineContainer from './TimelineContainer'
import styles from '../styles/App'
import * as CurrentCategoryActions from '../../actions/CurrentCategoryActions'
import * as CurrentPublisherActions from '../../actions/CurrentPublisherActions'

class PublisherSceneContainer extends Component {
  static fetchData({ dispatch, publisherSlug }) {
    return [
      dispatch(CurrentCategoryActions.clear()),
      dispatch(CurrentPublisherActions.getPublisher(publisherSlug))
    ]
  }

  componentDidMount() {
    this.constructor.fetchData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.publisherSlug !== this.props.publisherSlug) {
      this.constructor.fetchData(nextProps)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <PublisherHeaderContainer />
        <TimelineContainer />
      </View>
    )
  }
}

let mapStateToProps = (state, ownProps) => {
  return {
    publisherSlug: ownProps.publisherSlug
  }
}
export default connect(mapStateToProps)(PublisherSceneContainer)
