import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import withQuery from './index.gql'
import TimelineContainer from '../TimelineContainer'
import styles from '../../styles/App'

class SummariesTimelineContainer extends Component {
  render () {
    const renderOptions = { timelineType: 'summaries' }

    return (
      <View style={styles.listViewContainer}>
        <TimelineContainer data={this.props.data} renderOptions={renderOptions} />
      </View>
    )
  }
}

SummariesTimelineContainer.propTypes = {
  data: PropTypes.object
}

export default withQuery(SummariesTimelineContainer)
