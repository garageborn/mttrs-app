import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import { AnalyticsActions } from '../../../actions/index'
import TimelineControl from '../../../components/TimelineControl'
import styles from '../../../styles/App'

class PublisherTimeline extends Component {
  componentWillMount () {
    this.analyticsTrack()
  }

  analyticsTrack () {
    const { dispatch, model } = this.props
    dispatch(AnalyticsActions.trackScreen(`/${model.slug}`))
  }

  render () {
    return (
      <View style={styles.listViewContainer}>
        <TimelineControl data={this.props.data} />
      </View>
    )
  }
}

PublisherTimeline.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.object.isRequired
}

const PublisherTimelineWithData = withQuery(PublisherTimeline)
export default connect()(PublisherTimelineWithData)
